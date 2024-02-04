import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, getUserById } from "../api";
import { User } from "../types";

interface UserState {
  users: User[] | null;
  selectedUser: User | null;
}

const initialState: UserState = {
  users: null,
  selectedUser: null,
};

export const fetchUserById = createAsyncThunk(
  "fetchUserById",
  // if you type your function argument here
  async (userId: string) => {
    const response = await getUserById(userId);
    console.log(response);
    return response;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",

  async () => {
    const response = await getAllUsers();
    console.log(response);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {},
    logOut: (state, action: PayloadAction<string>) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        state.selectedUser = action.payload;
      }
    });

    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        state.users = action.payload;
      }
    });
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
