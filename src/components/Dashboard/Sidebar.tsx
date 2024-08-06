"use client";

import {
  Box,
  Flex,
  IconButton,
  CloseButton,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiLogOut,
  FiBarChart,
  FiMenu,
  FiUserPlus,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, href: "/cd/admin/dashboard" }, 
  { name: "Employees", icon: FiUsers, href: "/cd/admin/dashboard/employees" },
  { name: "Permissions", icon: FiFileText, href: "/cd/admin/dashboard/permissions" },
  { name: "Add Employee", icon: FiUserPlus, href: "/cd/admin/dashboard/add-employee" },
  {
    name: "Monthly Reports",
    icon: FiBarChart,
    href: "/cd/admin/dashboard/monthly-reports",
  },
  { name: "Logout", icon: FiLogOut, href: "/logout" },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <Box
      bg={"#2D3748"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      transition="left 0.3s"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          textColor={"white"}
          key={link.name}
          icon={link.icon}
          href={link.href}
          mb={".5rem"}
          isActive={pathname === link.href}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  icon,
  children,
  href,
  isActive,
  ...rest
}: NavItemProps) => {
  return (
    <Box
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      {/* <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="details"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "blue",
        }}
        {...rest}
      > */}
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        cursor="pointer"
        bg={isActive ? "cyan.400" : "transparent"}
        color={isActive ? "white" : "inherit"}
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        <Link     href={href}> 
                {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
        
        </Link>

      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#4A5568", "gray.900")}
      borderBottomWidth="0px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      position={"fixed"}
      w={"100%"}
      zIndex={"99999"}
      {...rest}
    >
      <IconButton onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        <Image src={"/logo.png"} alt="logo" width={190} height={70} />
      </Text>
    </Flex>
  );
};
