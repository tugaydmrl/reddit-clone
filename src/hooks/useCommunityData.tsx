import React from 'react'
import { useRecoilState } from 'recoil'

import { Community, communityState } from '../atoms/communitiesAtom'

const useCommunityData = () => {

    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // user signed in ? if not => open auth modal

        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }

        joinCommunity(communityData);
    };

    const joinCommunity = (communityData: Community) => {

    };

    const leaveCommunity = (communityId: string) => {

    };

    return {
        // data and functions
        communityStateValue,
        onJoinOrLeaveCommunity
    }
}

export default useCommunityData