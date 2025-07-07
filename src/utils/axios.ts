import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(null, async (error) => {
  if (error.response?.status === 401) {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return axios(error.config);
    } catch (error) {
      window.location.href = "/auth";
      toast.error("You Have To Login Again")
    }
  } else {
    return Promise.reject(error);
  }
})

export default instance;