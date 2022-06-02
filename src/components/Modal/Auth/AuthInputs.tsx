import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import Login from './Login'
import SignUp from './SignUp'
import { authModalState } from '../../../atoms/authModalAtom'

type AuthInputProps = {}

const AuthInputs: React.FC<AuthInputProps> = () => {
    const modalState = useRecoilValue(authModalState);
    return (
        <Flex direction="column" align="center" width="100%" mt={4}>
            {modalState.view === "login" && <Login />}
            {modalState.view === "signup" && <SignUp />}

        </Flex>
    )
}

export default AuthInputs