import axios from "./axios";

export const logError = async (page: string, type: string, api: string, error: any) => {
  try {
    await axios.post("/errors", { page, type, api, error: error.message });
  } catch (_error) {
    console.error("Failed to log error:", _error);
  }
};