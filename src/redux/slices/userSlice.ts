import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/interfaces/userInterface";

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userState: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { userState } = userSlice.actions;
export default userSlice.reducer;