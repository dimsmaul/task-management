import unauth from "@/config/api/unauth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "./useAuthStore";

export interface SignInResponseType {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

const loginUser = async (credentials: { email: string; password: string }) => {
  const { data } = await unauth.post("/auth/login", credentials);
  return data.data;
};

export const useSignIn = () => {
  const { setUsers } = useAuthStore();
  const nav = useNavigate();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
  });

  const handleSignIn = useMutation({
    mutationFn: (data: z.infer<typeof ValidationSchema>) =>
      loginUser({ email: data.email, password: data.password }),
    onSuccess: (dt) => {
      setUsers({
        id: dt.user?.id,
        name: dt.user?.name,
        email: dt.user?.email,
        token: dt.token,
      });
      nav("/dashboard");
    },
    onError: (error) => {
      form.setError("root", {
        message: "Invalid username or password",
        type: "manual",
      });
      console.error("Login failed:", error);
    },
  });

  return { handleSignIn, form };
};

export const ValidationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// import unauth from "@/config/api/unauth";
// import { useAuthStore } from "./useAuthStore";
// import { useMutation } from "@tanstack/react-query";
// import { LoginResponse } from "../types/login-response.types";

// const loginUser = async (credentials: { email: string; password: string }) => {
//   const { data } = await unauth.post("/auth/login", credentials);
//   return data;
// };

// export const useLogin = () => {
//   const set = useAuthStore((state) => state.setUsers);

//   const initialValues = {
//     email: "admin@gmail.com",
//     password: "admin123",
//   };

//   /**
//    * This function is used to handle the login process.
//    * It uses the `useMutation` hook from React Query to perform the login request.
//    * It takes the user's credentials as input and sends a POST request to the server.
//    * If the request is successful, it stores the token in the auth store.
//    * @param {Object} credentials - The user's login credentials.
//    * @param {string} credentials.email - The user's email address.
//    * @param {string} credentials.password - The user's password.
//    */
//   const handleSubmit = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data: LoginResponse) => {
//       const dt = data.data;
//       set({
// id: dt.user?.id,
// name: dt.user?.name,
// email: dt.user?.email,
// token: dt.token,
//       });
//     },
//   });

//   return {
//     initialValues,
//     handleSubmit,
//   };
// };
