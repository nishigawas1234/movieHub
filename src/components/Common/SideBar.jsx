"use client";
import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Link,
  Flex,
  Divider,
  HStack,
  useToast,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';

const Sidebar = () => {
  let pathname = useLocation().pathname;
  const [isLogout, setIsLogout] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const siderBarItem = [
    {
      label: "Home",
      icon: (
        <></>
        // <NavDashboard
        //   h="18px"
        //   w="18px"
        //   mr="8px"
        //   color={pathname.includes("dashboard") ? "#fff" : "#2C365C"}
        // />
      ),
      href: "/home",
    },
    {
      label: "My list",
      icon: (
        <></>
        // <NavTimeSheet
        //   h="18px"
        //   w="18px"
        //   mr="8px"
        //   color={pathname === "/time-sheet" ? "#fff" : "#2C365C"}
        // />
      ),
      href: "/list",
    },
    {
      label: "Documents",
      icon: (
        <></>
        // <NavDocuments
        //   h="18px"
        //   w="18px"
        //   mr="8px"
        //   color={pathname === "/documents" ? "#fff" : "#2C365C"}
        // />
      ),
      href: "/documents",
    },
    {
      label: "Logout",
      icon: ( <></>
        // <NavLogout
        //   h="18px"
        //   w="18px"
        //   mr="8px"
        //   color={pathname === "/logout" ? "#fff" : "#FF3535"}
        // />
      ),
      onClick: () => setIsLogout(true),
    },
  ];

  const handleLogout = async () => {
    // Implement logout functionality
  };

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Sidebar"
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        position="fixed"
        top="4"
        left="4"
        zIndex="docked"
      />
      <Box
        pos={{ base: "fixed", md: "fixed" }}
        left={{ base: "0", md: "auto" }}
        top={{ base: "0", md: "auto" }}
        h="100vh"
        w={{ base: "100%", md: "250px" }}
        bg="#FFF"
        p="4"
        mt={15}
        textAlign="center"
        borderRight={{ base: "none", md: "1px solid #eee" }}
        display={{ base: "none", md: "block" }}
      >
        <Text fontSize="4xl" color="primary.500" fontWeight="bold" mb="10">
          MovieHub
        </Text>

        <VStack as="nav">
          {siderBarItem.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <Link
                  href={item.href}
                  bg={
                    item?.href && pathname.includes(item?.href)
                      ? "primary.500"
                      : "#fff"
                  }
                  _hover={{
                    bg:
                      item?.href && pathname.includes(item?.href)
                        ? "primary.500"
                        : "primary.100",
                  }}
                  color={
                    item?.href && pathname.includes(item?.href)
                      ? "#fff"
                      : item.label === "Logout"
                      ? "#FF3535"
                      : "#2C365C"
                  }
                  w="100%"
                  borderRadius="8px"
                  px="4"
                  py="3"
                  onClick={item.label === "Logout" ? item.onClick : undefined}
                >
                  <Flex>
                    {item.icon}
                    <Text> {item.label}</Text>
                  </Flex>
                </Link>
              </React.Fragment>
            );
          })}
        </VStack>
        <Box borderTop="1px solid #eee" position="absolute" bottom="2%" py="6">
          <UserProfile />
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>MovieHub</DrawerHeader>

          <DrawerBody>
            <VStack as="nav">
              {siderBarItem.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <Link
                      href={item.href}
                      bg={
                        item?.href && pathname.includes(item?.href)
                          ? "primary.500"
                          : "#fff"
                      }
                      _hover={{
                        bg:
                          item?.href && pathname.includes(item?.href)
                            ? "primary.500"
                            : "primary.100",
                      }}
                      color={
                        item?.href && pathname.includes(item?.href)
                          ? "#fff"
                          : item.label === "Logout"
                          ? "#FF3535"
                          : "#2C365C"
                      }
                      w="100%"
                      borderRadius="8px"
                      px="4"
                      py="3"
                      onClick={item.label === "Logout" ? item.onClick : undefined}
                    >
                      <Flex>
                        {item.icon}
                        <Text> {item.label}</Text>
                      </Flex>
                    </Link>
                  </React.Fragment>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
