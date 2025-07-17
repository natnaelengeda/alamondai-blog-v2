import axios from "@/utils/axios";

export const fetchUserProfile = async () => {
  const result = await axios.get('user/profile');
  if (result.status !== 200) {
    return null;
  }
  return result.data;
}


export const updateUserProfile = async (data: any) => {
  const result = await axios.patch('user', data);
  if (result.status !== 200) {
    throw new Error("Failed to update profile");
  }
  return result.data;
}