import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton
} from "@chakra-ui/react";
import NavLogout from '../Icons/NavLogout'
import MenuIcon from '../Icons/MenuIcon'

export default function UserProfile() {
  const handleLogout = async () => {
    window.location.href = "/login";
  };

  return (
    <Flex alignItems="center">
      <Image src="./Images/profile.png" borderRadius="50%" h="50px" w="50px" />
      <Box ms="2">
        <Text color="#111111" textAlign="start">
          Nishigandha
        </Text>
       
      </Box>
      <Menu >
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MenuIcon />}
            variant="outline"
            ms={5}
          />
          <MenuList>
            <MenuItem icon={<NavLogout h="14px" w="14px"/>} command="⌘T" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
    </Flex>
  );
}
