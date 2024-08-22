"use client";

import { useDisclosure } from "@chakra-ui/react";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Navbar onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <SideBar isOpen={isOpen} onClose={onClose} />
    </>
  );
}
