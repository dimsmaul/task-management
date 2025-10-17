import unauth from "@/config/api/unauth";
import { useAuthStore } from "./useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../types/login-response.types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerUser = async (credentials: RegisterInput) => {
  const { data } = await unauth.post("/auth/register", credentials);
  return data;
};

export const useRegister = () => {
  // const set = useAuthStore((state) => state.setUsers);
  const { setUsers } = useAuthStore();

  // const initialValues = {
  //   name: "",
  //   email: "",
  //   password: "",
  // };

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

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
    mutationFn: registerUser,
    onSuccess: (data: LoginResponse) => {
      const dt = data.data;
      setUsers({
        id: dt.user?.id,
        name: dt.user?.name,
        email: dt.user?.email,
        token: dt.token,
      });
    },
  });

  return {
    form,
    handleSubmit,
  };
};

export const validationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type RegisterInput = z.infer<typeof validationSchema>;
