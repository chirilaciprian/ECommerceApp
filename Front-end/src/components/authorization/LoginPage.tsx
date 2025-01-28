import React, { useState } from "react";
import "../../index.css";

import { Login } from "../../services/authService";
import { LoginHook } from "../../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginHook = LoginHook();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const res = await Login(loginHook.loginValues);
    if (res) {
      navigate("/"); // Redirect to home on successful login
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen md:max-h-screen flex flex-col md:flex-row merriweather">
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1696451203186-6eb38b06fbbc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D6eb5f40b07ab"
          alt="Luxury Suit"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-heading font-heading text-foreground mb-8 lg:text-4xl md:text-3xl text-2xl">
            Log In
          </h1>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-body text-foreground mb-2">
                Email Address
              </label>
              <input
                placeholder="Email Address"
                type="email"
                name="email"
                value={loginHook.loginValues.email}
                onChange={(e) => {
                  loginHook.setLoginValues({
                    ...loginHook.loginValues,
                    email: e.target.value,
                  });
                }}
                className="w-full px-4 py-2 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-body text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginHook.loginValues.password}
                  onChange={(e) => {
                    loginHook.setLoginValues({
                      ...loginHook.loginValues,
                      password: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary text-primary-content py-2 rounded-sm hover:bg-primary/90 transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
