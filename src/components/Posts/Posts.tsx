import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react'

import PostItem from './PostItem';
import { Community } from '../../atoms/communitiesAtom'
import { Post } from '../../atoms/postsAtom';
import { auth, firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';
import { Stack } from '@chakra-ui/react';

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
    };

    useEffect(() => {
        getPosts();
    }, [])

  return (
    <Stack>
        {postStateValue.posts.map(item => <PostItem key={item.title} post={item} userIsCreator={user?.uid === item.creatorId} userVoteValue={undefined} onVote={onVote} onDeletePost={onDeletePost} onSelectPost={onSelectPost} />)}
    </Stack>
  )
}

export default Posts