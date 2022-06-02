import { Input, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../../atoms/authModalAtom'

type SignUpProps = {}

const SignUp: React.FC<SignUpProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    //firebase
    const onSubmit = () => { };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // update form state
        setSignUpForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    return (
        <form onSubmit={onSubmit}>
            <Input required name="email" placeholder="email" type="email" mb={2} onChange={onChange} fontSize="10pt" _placeholder={{ color: "gray.500" }} _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }} _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} />
            <Input required name="password" placeholder="password" type="password" mb={2} onChange={onChange} fontSize="10pt" _placeholder={{ color: "gray.500" }} _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }} _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} />
            <Input required name="confirmPassword" placeholder="confirm password" type="password" mb={2} onChange={onChange} fontSize="10pt" _placeholder={{ color: "gray.500" }} _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }} _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} />
            <Button width="100%" height="36px" mt={2} mb={2} type="submit">Sign Up</Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already a redditor?</Text>
                <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={() =>
                    setAuthModalState((prev) => ({
                        ...prev,
                        view: "login"
                    }))
                }>LOG IN</Text>
            </Flex>
        </form >
    )
}

export default SignUp