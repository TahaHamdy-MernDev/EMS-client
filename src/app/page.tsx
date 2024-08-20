"use client";
import { login } from "@/redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { Status } from "@/utils/enums";
import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaPhoneAlt } from "react-icons/fa";
export interface ILoginFormInputs {
  phone: string;
  password: string;
}
export default function Page() {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector((state) => state.auth);
  const { handleSubmit, register } = useForm<ILoginFormInputs>();
  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    dispatch(login(data));
    console.log(data);
  };
  return (
    <Container
      maxW="container.xl"
      minH={"100svh"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        minW={{ base: "xs", sm: "sm", lg: "md" }}
        bg={"background.white"}
        shadow={"lg"}
        borderRadius={"lg"}
        py={{ base: 8, md: 10 }}
        px={{ base: 6, md: 8 }}
      >
        <VStack textAlign={"center"} spacing={1} mb={{ base: 3, md: 6 }}>
          <Heading>Login</Heading>
          <Text>
            Please enter your credentials to access
            <br /> your account.
          </Text>
        </VStack>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaPhoneAlt />
              </InputLeftElement>
              <Input
                required
                type="tel"
                autoComplete="user-phone"
                placeholder="Phone number"
                {...register("phone")}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock />
              </InputLeftElement>
              <Input
                required
                pr="2.7rem"
                autoComplete="current-password"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
              />
              <InputRightElement>
                <IconButton
                  icon={show ? <FaEyeSlash /> : <FaEye />}
                  aria-label={show ? "hide password" : "show password"}
                  bg={"transparent"}
                  border={"none"}
                  _hover={{ bg: "transparent" }}
                  _focus={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              mt="2"
              type="submit"
              width={"full"}
              variant={"main"}
              size={"lg"}
              isLoading={loginStatus == Status.LOADING}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
