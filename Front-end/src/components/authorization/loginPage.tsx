import React from "react";
import "../../index.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { PasswordHook } from "../../hooks/authHooks";
import { Login } from "../../services/authService";
import { LoginHook } from "../../hooks/authHooks";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const tooglePass = PasswordHook();

  const loginHook = LoginHook();

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await Login(loginHook.loginValues);
    if (res) navigate("/");
  };

  return (
    <>
      <div className="playfair w-screen h-screen flex items-center justify-center">
        <div className="absolute bg-black overflow-hidden flex w-screen h-screen z-10 opacity-50"></div>

        <div className="bg-authbg bg-cover bg-center w-screen h-screen absolute blur-none"></div>

        <div className="flex items-center justify-center w-screen h-screen z-20 m-0">
          <div className="bg-gray-100 flex flex-col  items-center pt-10 pb-10  md:w-1/4 w-3/4 rounded-sm gap-10 shadow-sm opacity-90 ">
            <h1 className="merriweather lg:text-5xl md:text-4xl text-3xl font-bold text-gray-600">
              Login
            </h1>
            <form
              action=""
              className="flex flex-col items-center justify-center p-10 gap-3"
            >
              <div className="flex flex-row bg-gray-200 p-2  rounded-sm text-authgray">
                <FaUser className="text-2xl" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-inherit ml-5 focus:outline-none text-black w-full"
                  onChange={(e) =>
                    loginHook.setLoginValues({
                      ...loginHook.loginValues,
                      email: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-row bg-gray-200 p-2  rounded-sm text-authgray">
                <RiLockPasswordFill className="text-2xl" />
                <input
                  type={tooglePass.passwordInputType}
                  placeholder="Password"
                  className="bg-inherit ml-5  focus:outline-none text-black w-full"
                  onChange={(e) =>
                    loginHook.setLoginValues({
                      ...loginHook.loginValues,
                      password: e.target.value,
                    })
                  }
                ></input>
                <button
                  type="button"
                  onClick={tooglePass.handleTogglePassword}
                  className="focus:outline-none absolute transform md:translate-x-44 translate-x-40"
                >
                  {tooglePass.showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mt-5">
                <span>Don't have an account?</span>
                <Link to="/signup" className="text-blue-400 cursor-pointer">
                  Click Here!
                </Link>
              </div>
              <span
                className="cursor-pointer bg-authgray hover:bg-blue-400 text-white p-2 text-2xl rounded-md pl-5 pr-5 font-extrabold transition duration-300 mt-3"
                onClick={handleLogin}
              >
                Submit
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
