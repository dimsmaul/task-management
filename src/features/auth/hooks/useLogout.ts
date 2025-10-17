import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";

export const useLogout = () => {
  const clearToken = useAuthStore((state) => state.clearToken);
  const navigate = useNavigate();

  /**
   * Logout function that clears the token and navigates to the login page.
   * It uses the `useAuthStore` to clear the token and `useNavigate` from react-router-dom
   * to redirect the user.
   */
  const logout = () => {
    clearToken();
    navigate("/login");
  };

  return { logout };
};
