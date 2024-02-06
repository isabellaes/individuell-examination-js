import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, User } from "../types";

interface SearchState {
  users: User[];
  posts: Post[];
}

const initialState: SearchState = {
  users: [],
  posts: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResultPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSearchResultUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setSearchResultPosts, setSearchResultUsers } =
  searchSlice.actions;
export default searchSlice.reducer;
