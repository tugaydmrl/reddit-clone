import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from "safe-json-stringify";

import { Community } from '../../../atoms/communitiesAtom'
import { firestore } from '../../../firebase/clientApp'

type CommunityPageProps = {
    communityData: Community;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    return (
        <div>{communityData.id}</div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })),
            }
        }
    } catch (error) {
        console.error("getServerSideProps error", error)
    }
}

export default CommunityPage