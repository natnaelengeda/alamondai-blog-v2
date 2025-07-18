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
  avatarUrl: null,
  isVerified: false,
  role: "",
  isLoggedIn: false,
};

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
    updateProfileImage: (state, action: PayloadAction<{ avatarUrl: string }>) => {
      state.avatarUrl = action.payload.avatarUrl
    },
    updateNameUserName: (state, action: PayloadAction<{ name: string, username: string }>) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.username = "";
      state.avatarUrl = "";
      state.isVerified = false;
      state.role = "";
      state.isLoggedIn = false;
    }
  }
})

export const { login, logout, addInfo, updateProfileImage, updateNameUserName } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;