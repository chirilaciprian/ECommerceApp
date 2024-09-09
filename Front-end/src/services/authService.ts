import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const API_BASE_URL = "http://localhost:5000";

interface registerValues {
  email: string;
  confirm_password: string;
  password: string;
  username: string;
}

interface loginValues {
  email: string;
  password: string;
}

export async function Register(userValues: registerValues): Promise<boolean> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/signup`,
      userValues
    );
    console.log(response);
    alert("User registered successfully");
    return true;
  } catch (err) {
    console.log(err);
    alert("User registration failed");
    return false;
  }
}

function tokenService(token: string) {
  const cookie = new Cookies();
  const decoded = jwtDecode(token);
  console.log(decoded);
  if (decoded.exp === undefined) return;
  cookie.set("jwt_auth", token, { expires: new Date(decoded.exp * 1000) });
}

export const logout = () => {
  const cookie = new Cookies();
  cookie.remove("jwt_auth");
  return false;
};

export async function Login(userValues: loginValues): Promise<boolean> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/login`,
      userValues
    );
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

export const isAuthenticated = async () => {
  const cookie = new Cookies();
  const token = cookie.get("jwt_auth");
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
