import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "../api";
import { ApiError, ApiResponse, User } from "../types";

interface UserState {
  users: User[];
  loggedInUser: User | null;
  errorMessage: string;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  errorMessage: "",
};

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async (): Promise<ApiResponse<User[]> | ApiError> => {
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
        state.errorMessage = "";
      } else {
        state.errorMessage = "No user found.";
      }
    },
    logOut: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (action.payload.status === 200 && "data" in action.payload) {
        const users: User[] = action.payload.data;
        state.users = users;
      }
    });
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
