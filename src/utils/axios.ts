import axios from "axios";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

instance.interceptors.request.use(async (config) => {
  // @ts-expect-error - extend config with custom flag
  if (config.skipAuth) return config;

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      toast.error("You need to log in again.");
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default instance;
