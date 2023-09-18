import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/interfaces/userInterface";

interface IUserState {
  user: IUser | null;
  access_token: string | null;
}

const initialState: IUserState = {
  user: null,
  access_token: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: () => initialState,
    userState: (state, action) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.access_token= access_token;
    },
  },
});

export const { logout, userState } = userSlice.actions;
export default userSlice.reducer;
