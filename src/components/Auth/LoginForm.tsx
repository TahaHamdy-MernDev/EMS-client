"use client";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/store";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@chakra-ui/react";
import { loginUser } from "@/features/auth/authSlice";
import { FaLock, FaPhoneAlt } from "react-icons/fa";
import CustomInput from "../CustomInput";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/utils/auth";
interface IFormInputs {
  phone: string;
  password: string;
}
const loginSchema = yup.object({
  phone: yup
    .string()
    .matches(/^(\+20|0)?1\d{9}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
interface DecodedToken {
  role: string;
}
export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    clearErrors,
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      const decodedToken: DecodedToken = jwtDecode(accessToken);
      if (decodedToken.role === "ADMIN") {
        router.push("/cd/admin/dashboard");
      } else if (decodedToken.role === "EMPLOYEE") {
        router.push("/cd/user/profile");
      }
    }
  }, [accessToken, router]);
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(({ accessToken }) => {
        const decodedToken: DecodedToken = jwtDecode(accessToken);
        if (decodedToken.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (decodedToken.role === "EMPLOYEE") {
          router.push("/user/profile");
        }
      });
  };
  return (
    <form
      className=" min-w-[350px] max-sm:min-w-[220px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" flex justify-between items-center p-6 text-white">
        <div className=" underline underline-offset-[8px]">
          <p>Employee</p>
        </div>
        <div className=" underline underline-offset-[8px]">
          <p>Admin</p>
        </div>
      </div>
      <CustomInput
        watch={watch}
        name="phone"
        type="tel"
        placeholder="Enter phone number"
        icon={<FaPhoneAlt color="gray.300" />}
        register={register}
        errors={errors}
        isRequired
        setError={setError}
        clearErrors={clearErrors}
        containerStyle={{ marginBottom: "16px" }}
        inputStyle={{ backgroundColor: "#FFF" }}
        inputClassName="custom-input-class"
        errorStyle={{ color: "red" }}
      />
      <CustomInput
        watch={watch}
        name="password"
        type="password"
        placeholder="Enter password"
        icon={<FaLock color="gray.300" />}
        register={register}
        errors={errors}
        isPassword
        isRequired
        setError={setError}
        clearErrors={clearErrors}
        containerStyle={{ marginBottom: "16px" }}
        inputStyle={{ backgroundColor: "#FFF" }}
        inputClassName="custom-input-class"
        errorStyle={{ color: "red" }}
      />
      <Button
        width={"100%"}
        colorScheme="blue"
        type="submit"
        isLoading={status === "loading"}
      >
        Login
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
}
