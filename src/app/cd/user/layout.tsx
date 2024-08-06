// import Logo from "@/components/Logo";
// import ProtectedRoute from "@/components/ProtectedRoute";

// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <ProtectedRoute>
//       {/* <Logo />
//       {children} */}

//     </ProtectedRoute>
//   );
// };

// export default Layout;
"use client"
import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Image,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
  Text,
  useColorModeValue,
  calc
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FaHome, FaUserAlt, FaCalendarAlt, FaLock } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('#2D3748', 'gray.800');
  const textColor = useColorModeValue('gray.800', '#2D3748');

  const menuItems = [
    { icon: FaUserAlt, text: 'Profile', href: '/cd/user/profile' },
    { icon: FaCalendarAlt, text: 'Attendance History', href: '/attendance-history' },
    { icon: FaLock, text: 'Request Permission', href: '/request-permission' },
  ];

  return (
    <ProtectedRoute>
      <Box minH="100svh">
        {/* Header */}
        <Flex
          position={'fixed'}
          top={0}
          left={0}
          w={'100%'}
          as="header"
          align="center"
          justify="space-between"
          wrap="nowrap"
          padding="1rem"
          bg={bgColor}
          color={textColor}
          boxShadow="md"
          // zIndex={'9999'}
        >
          <Flex align="center" mr={5}>
            <Image src="/logo.png" alt="Company Logo" className='h-6 md:h-10 w-auto max-w-full' />
          </Flex>

          <IconButton
            bg={'transparent'}
            width={4}
            _hover={{ bg: 'transparent' }}
            aria-label="Open Menu"
            icon={<FiMenu size={22} color='white' />}
            onClick={onOpen}
            display={{ base: 'flex' }}
          />
        </Flex>

        {/* Sidebar */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}  size={'xs'} >
          <DrawerOverlay>
            <DrawerContent marginTop={'5rem'}>
              {/* <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader> */}
              <DrawerBody >
              <DrawerCloseButton />
                <VStack align="stretch">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index + 1}
                      as={NextLink}
                      href={item.href}
                      onClick={onClose}
                      p={2}
                      _hover={{ bg: 'primary.600', color: 'white' }}
                      _activeLink={{ bg: 'primary.700', color: 'white' }}
                      borderRadius="md"
                    >
                      <Flex align="center" gap={2}>
                        <item.icon />
                        <Text>{item.text}</Text>
                      </Flex>
                    </Link>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        {/* Main Content */}
        <Box pt={20} minHeight={'100svh'}  >
          {children}
        </Box>
      </Box>
    </ProtectedRoute>

  );
};

export default Layout;