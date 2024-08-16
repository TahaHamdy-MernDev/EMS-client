"use client"
import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
  Button,
  Text,
  useColorModeValue,
  Heading,
  HStack,
  calc,
  DrawerHeader,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FaUserAlt, FaCalendarAlt, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const NavLink = ({ href, icon: Icon, children, onClick }) => {
 const pathname= usePathname()
  const isActive = pathname === href;
  return (
    <NextLink href={href} passHref>
      <Link
        display="flex"
        alignItems="center"
        px={4}
        py={2}
        rounded={'md'}
        onClick={onClick}
        _hover={{ bg: 'brand.navbar.hoverBackground' }}
        bg={isActive ? 'brand.navbar.activeBackground' : 'transparent'}
        color="brand.navbar.text"
        width="100%"
      >
        {Icon && <Icon style={{ marginRight: '8px' }} />}
        {children}
      </Link>
    </NextLink>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('brand.navbar.bg', 'gray.800');
  const textColor = useColorModeValue('brand.navbar.text', 'white');

  const menuItems = [
    { icon: FaUserAlt, text: 'Profile', href: '/ems/user/profile' },
    { icon: FaCalendarAlt, text: 'Attendance History', href: '/ems/user/attendance-history' },
    { icon: FaLock, text: 'Request Permission', href: '/ems/user/request-permission' },
  ];

  return (
    <ProtectedRoute>
      <Box minH="100vh">
        <Box bg={bgColor} px={4} position="fixed" top={0} left={0} w="100%" zIndex="sticky">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <HStack spacing={4}>
              <IconButton
                aria-label="Open Menu"
                icon={<FiMenu size={22} />}
                onClick={onOpen}
                variant="ghost"
                color={textColor}
              />
              <Heading color={textColor} fontSize="2xl">EMS</Heading>
            </HStack>
          </Flex>
        </Box>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay>
            <DrawerContent bg={bgColor}>
              <DrawerCloseButton color={textColor} />
              <DrawerHeader color={textColor}>Menu</DrawerHeader>
              <DrawerBody >
                <VStack align="stretch" spacing={2}>
                  {menuItems.map((item, index) => (
                    <NavLink key={index+1} href={item.href} icon={item.icon} onClick={onClose}>
                      {item.text}
                    </NavLink>
                  ))}
                  <NavLink href="/logout" icon={FaSignOutAlt} onClick={onClose}>
                    Logout
                  </NavLink>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        <Box pt={16} minHeight={calc.subtract('100vh -5rem')}>
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default Layout;