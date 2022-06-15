import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { authModalState } from '../atoms/authModalAtom'
import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom'
import { auth, firestore } from '../firebase/clientApp'

const useCommunityData = () => {

    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // user signed in ? if not => open auth modal
        if (!user) {
            setAuthModalState({ isOpen: true, view: "login" });
            return;
        }

        setLoading(true);
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
        } catch (error: any) {
            console.error("getMySnippets error", error)
            setError(error.message)
        }
        setLoading(false);
    }

    const joinCommunity = async (communityData: Community) => {
        // backend updates

        try {
            const batch = writeBatch(firestore);

            // creating a new community snippet
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
            };

            batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet);

            // updating the numberOfMembers
            batch.update(doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1)
            });

            await batch.commit();

            // frontend -> update recoil state - communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet]
            }))
        } catch (error: any) {
            console.error("joinCommunity error", error)
            setError(error.message);
        }
        setLoading(false);
    };

    const leaveCommunity = async (communityId: string) => {
        // backend site

        try {
            const batch = writeBatch(firestore);
            // deleting the community snippet from user
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));

            // updating the numberOfMembers
            batch.update(doc(firestore, "communities", communityId), {
                numberOfMembers: increment(-1)
            });

            await batch.commit();
            // frontend -> update recoil state - communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId)
            }))

        } catch (error: any) {
            console.error("leaveCommunity error", error)
            setError(error.message)
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user) {
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [],
            }));
            return;
        };
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