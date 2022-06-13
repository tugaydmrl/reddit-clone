import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react'
import React from 'react'

type TextInputProps = {
    textInputs: {
        title: string,
        body: string,
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
}

const TextInputs:React.FC<TextInputProps> = ({ textInputs, onChange, handleCreatePost, loading }) => {
  return (
    <Stack spacing={3} width="100%">
        <Input name="title" value={textInputs.title} onChange={onChange} fontSize="10pt" borderRadius={4} placeholder="Title" _placeholder={{ color: "gray.500" }} _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }} />
        <Textarea name="body" height="100px" value={textInputs.body} onChange={onChange} fontSize="10pt" borderRadius={4} placeholder="Text (optional)" _placeholder={{ color: "gray.500" }} _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }} />
        <Flex justify="flex-end">
            <Button height="34px" padding="8px 30px" disabled={!textInputs.title} isLoading={loading} onClick={handleCreatePost} >Post</Button>
        </Flex>
    </Stack>
  )
}

export default TextInputs