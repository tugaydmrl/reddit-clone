import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Text } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'

import AuthInputs from './AuthInputs'
import OAuthButton from './OAuthButton'
import { authModalState } from '../../../atoms/authModalAtom'

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            isOpen: false
        }))
    }


    return (
        <>
            <Modal isOpen={modalState.isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        {modalState.view === "login" && "Login"}
                        {modalState.view === "signup" && "Sign Up"}
                        {modalState.view === "resetPassword" && "Reset Password"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6}>
                        <Flex direction="column" align="center" justify="center" width="70%">
                            <OAuthButton />
                            <Text color="gray.500" fontWeight={700}>OR</Text>
                            <AuthInputs />
                            {/* <ResetPassword /> */}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal