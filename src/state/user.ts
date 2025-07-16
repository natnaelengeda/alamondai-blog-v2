import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  bio: string | null;
  email: string;
  username: string;
  isVerified: boolean;
  avatarUrl: string | null;
  role: "user" | string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: "",
  bio: "",
  email: "",
  username: "",
  avatarUrl: "",
  isVerified: false,
  role: "",
  isLoggedIn: false,
};

// type UserInfo = {
//   avatarUrl: string | null;
//   bio: string | null;
//   email: string;
//   isVerified: boolean;
//   name: string;
//   role: "user" | string;
//   username: string;
// };


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    addInfo: (state, action: PayloadAction<{ name: string, email: string, username: string, avatarUrl: string }>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.avatarUrl = action.payload.avatarUrl;
    },
    logout: (state) => {
      state.role = "";
      state.isLoggedIn = false;
    }
  }
})

export const { login, logout, addInfo } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;