"use client";
import { getAccessToken } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProtectedRoutes({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { token } = getAccessToken();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router, token]);
  return <>{children}</>;
}
