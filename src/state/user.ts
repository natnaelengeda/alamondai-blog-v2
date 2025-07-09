import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  bio: string | null;
  email: string;
  username: string;
  isVerified: boolean;
  avatarUrl: string | null;
  role: "user" | string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  name: "",
  bio: "",
  email: "",
  username: "",
  avatarUrl: "",
  isVerified: false,
  role: "",
  token: "",
  isLoggedIn: false,
};

type UserInfo = {
  avatarUrl: string | null;
  bio: string | null;
  email: string;
  isVerified: boolean;
  name: string;
  role: "user" | string;
  username: string;
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string, role: string, token: string, isLoggedIn: boolean }>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    addInfo: (state, action: PayloadAction<{ name: string, bio: string, email: string, username: string, avatarUrl: string, isVerified: boolean }>) => {
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.avatarUrl = action.payload.avatarUrl;
      state.isVerified = action.payload.isVerified;
    },
    logout: (state) => {
      state.id = "";
      state.role = "";
      state.token = "";
      state.isLoggedIn = false;
    }
  }
})

export const { login, logout, addInfo } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;