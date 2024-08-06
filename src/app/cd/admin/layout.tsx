"use client";
import { MobileNav, SidebarContent } from "@/components/Dashboard/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <ProtectedRoute>
      <Box minH="100vh">
        <SidebarContent
          onClose={onClose}
          //   display={{ base: "block", md: isSidebarOpen ? "block" : "none" }}
          display={{ base: "block" }}
          left={isSidebarOpen ? 0 : "-100%"}
          zIndex={"99999"}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
        <Flex
          ml={{ base: 0, md: isSidebarOpen ? 60 : 0 }}
          p="4"
          transition="margin-left 0.3s"
          minH="100vh"
          direction="column"
        >
          <IconButton
            aria-label="Toggle sidebar"
            icon={isSidebarOpen ? <MdClose /> : <FiMenu />}
            onClick={handleSidebarToggle}
            display={{ base: "none", md: "flex" }}
            position="fixed"
            top="4"
            left="4"
            zIndex="99999999999"
          />
          <Box flex="1" overflow="auto" pt='10' px={isSidebarOpen? '1':'10'}>
            {children}
          </Box>
        </Flex>
      </Box>
    </ProtectedRoute>
  );
};

export default Layout;
