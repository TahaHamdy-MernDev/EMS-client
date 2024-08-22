"use client";
import { login } from "@/redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { Roles, Status } from "@/utils/enums";
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
import { useRouter } from "next/navigation";
import { redirectUser } from "@/utils/helpers";
import useFcmToken from "@/lib/firebase/useFCMToken";

export interface ILoginFormInputs {
  phone: string;
  password: string;
  deviceToken: string;
}
export default function Page() {
  const { fcmToken } = useFcmToken();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loginStatus, isAuthenticated, userRole } = useAppSelector(
    (state) => state.auth
  );
  const { handleSubmit, register } = useForm<ILoginFormInputs>();
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  useEffect(() => {
    if (isAuthenticated) {
      return redirectUser(router, userRole);
    }
  });
  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    data = { ...data, deviceToken: fcmToken };
    dispatch(login(data))
      .unwrap()
      .then(async (res) => {
        const role = res?.data?.role;
        redirectUser(router, role);
      });
  };
  return (
    <Container
      maxW="container.xl"
      maxH={"100svh"}
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
