import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'

import AuthButtons from './AuthButtons'
import AuthModal from '../../Modal/Auth/AuthModal'
import { auth } from '../../../firebase/clientApp'

type RighContentProps = {
    user: any;
}

const RightContent: React.FC<RighContentProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user ? <Button onClick={() => signOut(auth)}>Logout</Button> : <AuthButtons />}
            </Flex>
        </>
    )
}

export default RightContent