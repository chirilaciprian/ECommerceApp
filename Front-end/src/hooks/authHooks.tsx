import React from "react";
import { registerValues, UserProps } from "../services/authService";

export const PasswordHook = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";

  return { showPassword, handleTogglePassword, passwordInputType };
};

export const ConfirmPasswordHook = () => {
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";

  return {
    showConfirmPassword,
    handleToggleConfirmPassword,
    confirmPasswordInputType,
  };
};

export const SignUpHook = () => {
  const [userValues, setUserValues] = React.useState<registerValues | null >(null);
  return { userValues, setUserValues };
};

export const LoginHook = () => {
  const [loginValues, setLoginValues] = React.useState({
    email: "",
    password: "",
  });

  return { loginValues, setLoginValues };
};

export const AuthHook = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return { isAuthenticated, setIsAuthenticated, handleAuth };
};

export const ProfileHook = () => {
  const [user, setUser] = React.useState<UserProps | null>(null);
  return { user, setUser };
};
