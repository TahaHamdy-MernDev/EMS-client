import { CSSProperties, ReactNode, useEffect, useState } from "react";
import {
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  FormErrorMessage,
  IconButton,
  FormLabel,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormWatch,
} from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface CustomInputProps {
  type?: string;
  placeholder: string;
  icon: ReactNode;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  label:string;
  isPassword?: boolean;
  isRequired?: boolean;
  containerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  inputClassName?: string;
  errorStyle?: CSSProperties;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: UseFormWatch<any>;
}

const CustomInput = ({
  type = "text",
  placeholder,
  icon,
  register,
  errors,
  name,
  isPassword = false,
  isRequired = false,
  containerStyle = {},
  inputStyle = {},
  inputClassName = "",
  errorStyle = {},
  setError,
  label,
  clearErrors,
  watch,
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState("password");
  const watchedValue = watch(name);
  useEffect(() => {
    if (watchedValue) {
      clearErrors(name);
    }
  }, [watchedValue, clearErrors, name]);
  const handleClick = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(name);
  };

  return (
    <FormControl
      isInvalid={!!errors[name]}
      isRequired={isRequired}
      style={containerStyle}
     
    >
          <FormLabel color="brand.text.primary">{label}</FormLabel>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        <Input

          {...register(name, {
            onChange: handleChange,
            shouldUnregister: false,
          })}
          pr={isPassword ? "4.5rem" : undefined}
          type={isPassword ? showPassword : type}
          placeholder={placeholder}
          name={name}
          border={'2px solid brand.primary.main'}
          style={inputStyle}
          autoComplete={isPassword ? "current-password" : type}
        />
        {isPassword && (
          <InputRightElement>
            <IconButton
              size="lg"
              variant="text"
              aria-label={
                showPassword === "password"
                  ? "Mask password"
                  : "Reveal password"
              }
              icon={showPassword === "password" ? <HiEyeOff /> : <HiEye />}
              onClick={handleClick}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage color="brand.error.main">
        {errors?.[name]?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
