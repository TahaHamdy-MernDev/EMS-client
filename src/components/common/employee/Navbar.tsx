"use client";
import { Box, Container, HStack, Heading, IconButton } from "@chakra-ui/react";
import { IoClose, IoMenu } from "react-icons/io5";

interface NavbarProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function Navbar({ onOpen, onClose, isOpen }: NavbarProps) {
  return (
    <Box
      bg={"primary.main"}
      px={4}
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex="99999"
    >
      <Container maxW={"container.xl"}>
        <HStack  py={2} spacing={2} justifyContent={"space-between"}>
          <Heading color={"text.white"} fontSize="3xl">
            EMS
          </Heading>
          <IconButton
            aria-label="Open Menu"
            icon={isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            onClick={isOpen ? onClose : onOpen}
            variant={"menuButton"}
            fill={"secondary.main"}
          />
        </HStack>
      </Container>
    </Box>
  );
}
