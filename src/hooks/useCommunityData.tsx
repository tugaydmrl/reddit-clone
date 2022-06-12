import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'

import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom'
import { auth, firestore } from '../firebase/clientApp'

const useCommunityData = () => {

    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // user signed in ? if not => open auth modal

        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }

        joinCommunity(communityData);
    };

    const getMySnippets = async () => {
        setLoading(true);
        try {
            // get users snippets
            const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`))

            const snippets = snippetDocs.docs.map(doc => ({ ...doc.data() }));
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
            }))
        } catch (error) {
            console.error("getMySnippets error", error)
        }
        setLoading(false);
    }

    const joinCommunity = (communityData: Community) => {

    };

    const leaveCommunity = (communityId: string) => {

    };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user]);

    return {
        // data and functions
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}

export default useCommunityData