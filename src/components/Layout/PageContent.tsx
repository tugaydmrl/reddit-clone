import { Box, Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface PageContentProps {
    children: ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
    return (
        <Flex justify="center" padding="16px 0px">
            <Flex width="95%" justify="center" maxWidth="860px">
                {/* left side */}
                <Flex direction="column" width={{ base: "100%", md: "65%" }} mr={{ base: 0, md: 6 }}>{children && children[0 as keyof typeof children]}</Flex>
                {/* right side */}
                <Box flexDirection="column" display={{ base: "none", md: "flex" }} flexGrow={1}>{children && children[1 as keyof typeof children]}</Box>
            </Flex>
        </Flex>
    )
}

export default PageContent