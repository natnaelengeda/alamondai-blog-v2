import axios from "axios";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { logoutAndClear } from "@/lib/logout";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

async function getTokenWhenReady(): Promise<string | null> {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }

  // Wait for Firebase to restore user session
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        const token = await user.getIdToken();
        resolve(token);
      } else {
        resolve(null);
      }
    });
  });
}

instance.interceptors.request.use(async (config) => {
  // @ts-expect-error - extend config with custom flag
  if (config.skipAuth) return config;

  const token = await getTokenWhenReady();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Optionally: redirect or trigger logout

      toast.error("Unauthorized: Please log in again.");
      await logoutAndClear();
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default instance;
