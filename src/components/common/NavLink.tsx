import { Link, Icon as ChakraIcon, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useMemo } from "react";

interface NavLinkProps extends LinkProps {
  href: string;
  onClick?: () => void;
  Icon?: React.ElementType;
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  onClick,
  Icon,
  children,
  ...linkProps
}) => {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname, href]);

  return (
    <Link
      as={NextLink}
      href={href}
      display="flex"
      alignItems="center"
      px={4}
      py={3}
      rounded="md"
      onClick={onClick}
      _hover={{ bg: "secondary.dark" }}
      bg={isActive ? "secondary.darker" : "transparent"}
      color="text.white"
      width="100%"
      {...linkProps}
    >
      {Icon && (
        <ChakraIcon
          as={Icon}
          width={22}
          height={22}
          color={"text.white"}
          mr={2}
        />
      )}
      {children}
    </Link>
    // </NextLink>
  );
};

export default React.memo(NavLink);
