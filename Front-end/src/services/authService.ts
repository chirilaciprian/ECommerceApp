import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
// import Cookies from "universal-cookie";
import Cookies from "js-cookie";
import { sendWelcomeEmail } from "./emailService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface registerValues {
  email: string;
  confirm_password: string;
  password: string;
  username: string;
}

export interface UserProps {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  phone: string;
  address: string;
}

interface loginValues {
  email: string;
  password: string;
}

export async function Register(registerValues: registerValues): Promise<boolean> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/signup`, registerValues);
    console.log(response);
    alert("User registered successfully");
    await sendWelcomeEmail(registerValues.email, registerValues.username);
    return true;
  } catch (err) {
    console.log(err);
    alert("User registration failed");
    return false;
  }
}

function tokenService(token: string) {
  
  const decoded = jwtDecode(token);
  console.log(decoded);
  if (decoded.exp === undefined) return;
  Cookies.set("jwt_auth", token, { expires: new Date(decoded.exp * 1000) });
}

export const logout = () => {
  
  Cookies.remove("jwt_auth");
  return false;
};

export const isAuthenticated = async () => {  
  const token = Cookies.get("jwt_auth");
  if (token) {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/me`, {
        headers: {
          Authorization: `${token}`,
        },
      });      
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};


export async function Login(userValues: loginValues): Promise<boolean> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, userValues);
    console.log(response);
    tokenService(response.data.token);
    alert("User logged in successfully");

    return true;
  } catch (err) {
    console.log(err);
    if (
      (err as AxiosError).response?.status === 404 ||
      (err as AxiosError).response?.status === 401
    )
      alert("Invalid credentials");
    else alert("User login failed");
    return false;
  }
}


export const updateUser = async (userValues: UserProps) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/users/${userValues.id}`,
      userValues
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
