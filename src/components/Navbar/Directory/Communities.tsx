import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaReddit } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { useRecoilValue } from 'recoil';

import { communityState } from '../../../atoms/communitiesAtom';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal'
import MenuListItem from './MenuListItem';

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const mySnippets = useRecoilValue(communityState).mySnippets;

    return (
        <>
            <CreateCommunityModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
            <Box mt={3} mb={4}>
                <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">MODERATING</Text>
            </Box>
            {mySnippets.filter(snippet => snippet.isModerator).map(snippet => (
                <MenuListItem key={snippet.communityId} icon={FaReddit} displayText={`r/${snippet.communityId}`} link={`/r/${snippet.communityId}`} iconColor="blue.500" imageURL={snippet.imageURL} />
            ))}
            <Box mt={3} mb={4}>
                <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">MY COMMUNITIES</Text>
            </Box>
            <MenuItem width="100%" fontSize="10pt" _hover={{ bg: "gray.100" }} onClick={() => setIsOpen(true)}>
                <Flex align="center">
                    <Icon fontSize={20} mr={2} as={GrAdd} />
                    Create Community
                </Flex>
            </MenuItem>
            {mySnippets.map(snippet => (
                <MenuListItem key={snippet.communityId} icon={FaReddit} displayText={`r/${snippet.communityId}`} link={`/r/${snippet.communityId}`} iconColor="brand.100" imageURL={snippet.imageURL} />
            ))}
        </>
    )
}

export default Communities