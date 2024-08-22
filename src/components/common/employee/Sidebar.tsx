"use client";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaHome, FaLock, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import NavLink from "../NavLink";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const menuItems = [
    { icon: FaHome, text: "Main", href: "/employee/daily-attendance" },
    { icon: FaUserAlt, text: "Profile", href: "/employee/profile" },
    {
      icon: FaCalendarAlt,
      text: "Attendance History",
      href: "/employee/attendance-history",
    },
    {
      icon: FaLock,
      text: "Request Permission",
      href: "/employee/request-permission",
    },
  ];

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay>
        <DrawerContent pt={14}>
          <DrawerBody
            borderRight={"2px"}
          
            borderRightColor={"text.white"}
            
            bg={"primary.darker"}
          >
            <VStack
              align="stretch"
              h={"full"}
              justifyContent={"space-between"}
              pt={2}
              spacing={4}
            >
              <VStack align="stretch" pt={2}>
                {menuItems.map((item, index) => (
                  <NavLink
                    key={index + 1}
                    href={item.href}
                    Icon={item.icon}
                    onClick={onClose}
                  >
                    {item.text}
                  </NavLink>
                ))}
              </VStack>
              <Button
                display="flex"
                alignItems="center"
                px={4}
                py={3}
                rounded="md"
                // onClick={onClick}
                border={'0'}
                _hover={{ bg: "secondary.dark" }}
                bg={"secondary.darker"}
                color="text.white"
                width="100%" 
                fill={'text.white'}
                leftIcon={<FaSignOutAlt size={22} color="text.white !impotent" fill="text.white !important" />}
                onClick={onClose}
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
