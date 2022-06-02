import { Flex } from '@chakra-ui/react'
import React from 'react'

import AuthButtons from './AuthButtons'

type RighContentProps = {}

const RightContent: React.FC<RighContentProps> = () => {
    return (
        <>
            {/* <AuthModel /> */}
            <Flex justify="center" align="center">
                <AuthButtons />
            </Flex>
        </>
    )
}

export default RightContent