import React from "react";
import "../../index.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import {
  PasswordHook,
  ConfirmPasswordHook,
  SignUpHook,
} from "../../hooks/authHooks";
import { Register } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const tooglePass = PasswordHook();

  const toogleConfirmPass = ConfirmPasswordHook();

  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const userHooks = SignUpHook();

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (userHooks.userValues) {
      const res = await Register({
        email: userHooks.userValues.email,
        username: userHooks.userValues.username,
        password: userHooks.userValues.password,
        confirm_password: confirmPassword,
      });
      if (res) navigate("/login");
    } else {
      // Handle the case where userValues is null (optional)
      console.log("User values are incomplete");
    }
  };

  return (
    <>
      <div className="playfair w-screen h-screen flex items-center justify-center">
        <div className="absolute bg-black overflow-hidden flex w-screen h-screen z-10 opacity-50"></div>

        <div className="bg-authbg bg-cover bg-center w-screen h-screen absolute blur-sm"></div>

        <div className="flex items-center justify-center w-screen h-screen z-20 m-0">
          <div className="glass flex flex-col  items-center pt-10 pb-10  md:w-1/4 w-3/4 rounded-sm gap-10 shadow-sm opacity-90 ">
            <h1 className="merriweather lg:text-5xl md:text-4xl text-3xl font-bold text-neutral-content">
              Sign Up
            </h1>
            <form
              action=""
              className="flex flex-col items-center justify-center p-10 gap-3"
            >
              <div className="flex flex-row bg-gray-200 p-2  rounded-sm text-authgray">
                <IoMdMail className="text-2xl" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-inherit ml-5 focus:outline-none text-black w-full"
                  onChange={(e) =>
                    userHooks.setUserValues({                      
                      email: e.target.value,
                      username: userHooks.userValues?.username || "",
                      password: userHooks.userValues?.password || "",
                      confirm_password: confirmPassword || "",
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-row bg-gray-200 p-2  rounded-sm text-authgray">
                <FaUser className="text-2xl" />
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-inherit ml-5 focus:outline-none text-black w-full"
                  onChange={(e) =>
                    userHooks.setUserValues({                      
                      email: userHooks.userValues?.email || "",
                      username: e.target.value,
                      password: userHooks.userValues?.password || "",
                      confirm_password: confirmPassword || "",
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
                    userHooks.setUserValues({
                      email: userHooks.userValues?.email || "",
                      username: userHooks.userValues?.username || "",
                      password: e.target.value,
                      confirm_password: confirmPassword || "",
                    })
                  }
                ></input>
                <button
                  type="button"
                  onClick={tooglePass.handleTogglePassword}
                  className="focus:outline-none absolute transform lg:translate-x-48 translate-x-40"
                >
                  {tooglePass.showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="flex flex-row bg-gray-200 p-2  rounded-sm text-authgray">
                <RiLockPasswordFill className="text-2xl" />
                <input
                  type={toogleConfirmPass.confirmPasswordInputType}
                  placeholder="Confirm Password"
                  className="bg-inherit ml-5  focus:outline-none text-black w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <button
                  type="button"
                  onClick={toogleConfirmPass.handleToggleConfirmPassword}
                  className="focus:outline-none absolute transform lg:translate-x-48 translate-x-40"
                >
                  {toogleConfirmPass.showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mt-5">
                <span className="text-neutral-content">Already have an account?</span>
                <Link to="/login" className="text-blue-400 cursor-pointer">
                  Click Here!
                </Link>
              </div>
              <span
                className="cursor-pointer bg-authgray hover:bg-blue-400 text-white p-2 text-2xl rounded-md pl-5 pr-5 font-extrabold transition duration-300 mt-3"
                onClick={() => handleRegister()}
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

export default SignUpPage;
