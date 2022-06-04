import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Icon, Flex, MenuDivider, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { TiHome } from "react-icons/ti"


const Directory: React.FC = () => {
    return (
        <Menu>
            <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} mr={2} ml={{ base: 0, md: 2 }} _hover={{ outline: "1px solid", outLineColor: "gray.200" }}>
                <Flex align="center" justify="space-between" width={{ base: "auto", lg: "200px" }}>
                    <Flex align="center">
                        <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
                        <Flex display={{ base: "none", lg: "flex" }}>
                            <Text fontWeight={600} fontSize="10pt">Home</Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                Communities
                {/* <Communities /> */}
            </MenuList>
        </Menu>
    )
}

export default Directory