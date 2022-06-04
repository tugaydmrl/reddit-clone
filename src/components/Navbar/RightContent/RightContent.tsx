import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'

import AuthButtons from './AuthButtons'
import Icons from './Icons'
import AuthModal from '../../Modal/Auth/AuthModal'

type RighContentProps = {
    user?: User | null;
}

const RightContent: React.FC<RighContentProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user ? <Icons /> : <AuthButtons />}
            </Flex>
        </>
    )
}

export default RightContent