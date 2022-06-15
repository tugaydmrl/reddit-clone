import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { authModalState } from '../atoms/authModalAtom';
import { communityState } from '../atoms/communitiesAtom';
import { Post, postState, PostVote } from '../atoms/postsAtom'
import { auth, firestore, storage } from '../firebase/clientApp';

const usePosts = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const currentCommunity = useRecoilValue(communityState).currentCommunity;
    const setAuthModalState = useSetRecoilState(authModalState);

    const onVote = async (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => {
      event.stopPropagation();

      if(!user?.uid) {
        setAuthModalState({ isOpen: true, view: "login" })
      }

      try {
        const { voteStatus } = post;
        const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id);

        const batch = writeBatch(firestore);
        const updatedPost = { ...post };
        const updatedPosts = [...postStateValue.posts];
        let updatedPostVotes = [...postStateValue.postVotes];
        let voteChange = vote;

        // New vote
        if(!existingVote) {
          // create a new postVote doc
          const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));

          const newVote: PostVote = {
            id: postVoteRef.id,
            postId: post.id!,
            communityId,
            voteValue: vote,
          };

          batch.set(postVoteRef, newVote);

          // add/ subtract 1 to/from post.VoteStatus
          updatedPost.voteStatus = voteStatus + vote;
          updatedPostVotes = [ ...updatedPostVotes, newVote ];

        }
        // existing vote 
        else {
          
          const postVoteRef = doc(firestore, "users", `${user?.uid}/postVotes/${existingVote.id}`);

          //  removing their vote
          if(existingVote.voteValue === vote) {
          // add/ subtract 1 to/from post.VoteStatus
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id);

          // delete the postVote doc
          batch.delete(postVoteRef);

          voteChange *= -1;
          }
          // flipping their vote
          else {
            // add/ subtract 2 to/from post.VoteStatus
            updatedPost.voteStatus = voteStatus + 2 * vote;
            
            const voteIdx = postStateValue.postVotes.findIndex(vote => vote.id === existingVote.id);

            updatedPostVotes[voteIdx] = {
              ...existingVote,
              voteValue: vote
            };
            // updating existing postVote doc
            batch.update(postVoteRef, {
              voteValue: vote,
            });

            voteChange = 2 * vote;
          }
        }

        // update state
        const postIdx = postStateValue.posts.findIndex(item => item.id === post.id);
        updatedPosts[postIdx] = updatedPost;
        setPostStateValue(prev => ({
          ...prev,
          posts: updatedPosts,
          postVotes: updatedPostVotes
        }));
        
        if (postStateValue.selectedPost) {
          setPostStateValue(prev => ({
            ...prev,
            selectedPost: updatedPost
          }));
        }

        const postRef = doc(firestore, "posts", post.id!);
        batch.update(postRef, { voteStatus: voteStatus + voteChange });
        
        await batch.commit();
        
        
      } catch (error: any) {
        console.error("onVote error", error.message)
      }
    };

    const onSelectPost = (post: Post) => {
      setPostStateValue(prev => ({
        ...prev,
        selectedPost: post
      }));
      router.push(`/r/${post.communityId}/comments/${post.id}`);
    };

    const onDeletePost = async (post: Post): Promise<boolean> => {
      try {
        // check image delete if exists
        if(post.imageURL) {
          const imageRef = ref(storage, `posts/${post.id}/image`);
          await deleteObject(imageRef);
        }
        // delete post doc from firestore
        const postDocRef = doc(firestore, "posts", post.id!);
        await deleteDoc(postDocRef);

        // update recoil state
        setPostStateValue(prev => ({
          ...prev,
          posts: prev.posts.filter(item => item.id !== post.id),
        }));
        return true; 
      } catch (error) {
        return false;
      }
    };

    const getCommunityPostVote = async ( communityId: string ) => {
      const postVotesQuery = query(collection(firestore, "users", `${user?.uid}/postVotes`), where("communityId", "==", communityId));

      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map(doc => ({ id: doc.id, ...doc.data(), }));

      setPostStateValue(prev => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }))
    };

    useEffect(() => {
      if(!user || !currentCommunity?.id) return;
      getCommunityPostVote(currentCommunity?.id)
    }, [user, currentCommunity]);

    useEffect(() => {
      if(!user) {
        setPostStateValue(prev => ({
          ...prev,
          postVotes: [],
        }));
      }
    }, [user])

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  }
}

export default usePosts