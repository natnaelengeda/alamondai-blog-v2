export type IUser = {
  id: number;
  uid: string;
  fullName: string;
  email: string;
  username: string;
  profileImage: string;
  isVerified: number; // 0 or 1 (could be boolean if you prefer)
  token: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};