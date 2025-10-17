import unauth from "@/config/api/unauth";
import { useAuthStore } from "./useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../types/login-response.types";

const loginUser = async (credentials: { email: string; password: string }) => {
  const { data } = await unauth.post("/auth/login", credentials);
  return data;
};

export const useLogin = () => {
  const set = useAuthStore((state) => state.setUsers);

  const initialValues = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  /**
   * This function is used to handle the login process.
   * It uses the `useMutation` hook from React Query to perform the login request.
   * It takes the user's credentials as input and sends a POST request to the server.
   * If the request is successful, it stores the token in the auth store.
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.email - The user's email address.
   * @param {string} credentials.password - The user's password.
   */
  const handleSubmit = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      const dt = data.data;
      set({
        id: dt.user?.id,
        name: dt.user?.name,
        email: dt.user?.email,
        token: dt.token,
      });
    },
  });

  return {
    initialValues,
    handleSubmit,
  };
};
