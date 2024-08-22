import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
}

export const setAccessToken = (accessToken: string): void => {
  Cookies.set("accessToken", accessToken);
};
export const setRefreshToken = (refreshToken: string): void => {
  const EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7Days
  Cookies.set("refreshToken", refreshToken, {
    expires: EXPIRES_IN,
    secure: true,
  });
};

export const getAccessToken = (): {
  token: string | undefined;
  decodedToken: DecodedToken | null;
} => {
  const token = Cookies.get("accessToken");
  let decodedToken: DecodedToken | null = null;

  if (token) {
    try {
      decodedToken = jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }

  return { token, decodedToken };
};

export const removeAccessToken = (): void => {
  Cookies.remove("accessToken");
};
