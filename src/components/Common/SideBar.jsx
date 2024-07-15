"use client";
import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Link,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const siderBarItem = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "My Watchlist",
      href: "/list",
    },
  ];


  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Sidebar"
        display={{ base: "block", lg: "none" }}
        onClick={onOpen}
        position="fixed"
        top="4"
        left="4"
        zIndex="docked"
      />
      <Box
        pos="fixed"
        left="0"
        top="0"
        h="100vh"
        w={{ base: "0", lg: "250px" }}
        bg="#FFF"
        p="4"
        textAlign="center"
        borderRight={{ base: "none", md: "1px solid #eee" }}
        display={{ base: "none", lg: "block" }}
      >
        <Text fontSize="4xl" color="primary.500" fontWeight="bold" mb="10">
          MovieHub
        </Text>
        <VStack as="nav">
          {siderBarItem.map((item, i) => (
            <React.Fragment key={i}>
              <Link
                href={item.href}
                bg={pathname.includes(item.href) ? "primary.500" : "#fff"}
                _hover={{
                  bg: pathname.includes(item.href) ? "primary.500" : "primary.100",
                }}
                color={pathname.includes(item.href) ? "#fff" : "#2C365C"}
                w="100%"
                borderRadius="8px"
                px="4"
                py="3"
              >
                <Flex>
                  <Text> {item.label}</Text>
                </Flex>
              </Link>
            </React.Fragment>
          ))}
        </VStack>
        <Box borderTop="1px solid #eee" position="absolute" bottom="2%" py="6">
          <UserProfile />
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>MovieHub</DrawerHeader>
          <DrawerBody>
            <VStack as="nav">
              {siderBarItem.map((item, i) => (
                <React.Fragment key={i}>
                  <Link
                    href={item.href}
                    bg={pathname.includes(item.href) ? "primary.500" : "#fff"}
                    _hover={{
                      bg: pathname.includes(item.href)
                        ? "primary.500"
                        : "primary.100",
                    }}
                    color={pathname.includes(item.href) ? "#fff" : "#2C365C"}
                    w="100%"
                    borderRadius="8px"
                    px="4"
                    py="3"
                  >
                    <Flex>
                      {item.icon}
                      <Text> {item.label}</Text>
                    </Flex>
                  </Link>
                </React.Fragment>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
