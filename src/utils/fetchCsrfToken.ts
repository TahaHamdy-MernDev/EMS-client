import axios from "axios";

export const fetchCsrfToken = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/csrf-token`,
    { withCredentials: true }
  );
  return response.data.data.csrfToken;
};
