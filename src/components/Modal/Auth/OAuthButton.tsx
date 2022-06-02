import { Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'

const OAuthButton: React.FC = () => {
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2}><Image src="/images/googlelogo.png" height="20px" mr={2} /> Continue with Google</Button>
            <Button variant="oauth">Another Provider</Button>
        </Flex>
    )
}

export default OAuthButton