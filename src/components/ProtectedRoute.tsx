"use client";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/utils/auth";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
interface DecodedToken {
  role: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const accessToken = getAccessToken();
  console.log("access Token", accessToken);
  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);
  return <>{children}</>;
};

export default ProtectedRoute;
