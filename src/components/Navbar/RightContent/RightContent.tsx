import { Flex } from '@chakra-ui/react'
import React from 'react'

import AuthButtons from './AuthButtons'
import AuthModal from '../../Modal/Auth/AuthModal'

type RighContentProps = {}

const RightContent: React.FC<RighContentProps> = () => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                <AuthButtons />
            </Flex>
        </>
    )
}

export default RightContent