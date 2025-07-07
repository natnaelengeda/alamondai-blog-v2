import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TempUserState {
  isOnProcess: boolean;
  email: string;
  username: string;
}

const initialState: TempUserState = {
  isOnProcess: false,
  email: "",
  username: ""
};

export const tempUserSlice = createSlice({
  name: "tempUser",
  initialState,
  reducers: {
    addTempUser: (state, action: PayloadAction<TempUserState>) => {
      state.isOnProcess = action.payload.isOnProcess;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    removeTempUser: (state) => {
      state.isOnProcess = false;
      state.email = "";
      state.username = "";
    }
  },
});

export const { addTempUser, removeTempUser } = tempUserSlice.actions;
export const selectTempUser = (state: { tempUser: TempUserState }) => state.tempUser;
export default tempUserSlice.reducer;