import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "../api";
import { ApiError, User } from "../types";

interface UserState {
  users: User[];
  loggedInUser: User | null;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
};

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async (): Promise<User[] | ApiError> => {
    try {
      const response = await getAllUsers();
      return response;
    } catch (error) {
      throw new Error("Error fetching user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<number>) => {
      const user = state.users.find((user) => user.id === action.payload);

      if (user) {
        state.loggedInUser = user;
      }
    },
    logOut: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        const users: User[] = action.payload;
        state.users = users;
      }
    });
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
