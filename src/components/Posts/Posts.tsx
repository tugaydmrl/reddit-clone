import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react'

import PostItem from './PostItem';
import PostLoader from './PostLoader';
import { Community } from '../../atoms/communitiesAtom'
import { Post } from '../../atoms/postsAtom';
import { auth, firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';

type PostsProps = {
    communityData: Community;
    userId?: string;
}

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false);
    const {postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost } = usePosts();

    const getPosts = async () => {
        try {
            setLoading(true);

            const postsQuery = query(collection(firestore, "posts"), where("communityId", "==", communityData.id), orderBy("createdAt", "desc"));
            const postDocs = await getDocs(postsQuery);
            
            const posts = postDocs.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setPostStateValue(prev => ({
                ...prev,
                posts: posts as Post[]
            }))
        } catch (error: any) {
            console.error("getPosts error", error.message)
        }
        setLoading(false);
    };

    useEffect(() => {
        getPosts();
    }, [])

  return (
    <>
    {loading ? (
        <PostLoader />
    ) : (
        <Stack>
            {postStateValue.posts.map(item => <PostItem key={item.id} post={item} userIsCreator={user?.uid === item.creatorId} userVoteValue={undefined} onVote={onVote} onDeletePost={onDeletePost} onSelectPost={onSelectPost} />)}
        </Stack>
    )}
    </>
  )
}

export default Posts