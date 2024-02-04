import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostByPostId, getPostsByUserId } from "../api";
import { Post } from "../types";

interface PostState {
  post: Post | null;
  allPosts: Post[] | null;
}

const initialState: PostState = {
  post: null,
  allPosts: null,
};

export const fetchPostByPostId = createAsyncThunk(
  "fetchPostById",
  // if you type your function argument here
  async (userId: string) => {
    const response = await getPostByPostId(userId);
    console.log(response);
    return response;
  }
);

export const fetchAllPosts = createAsyncThunk(
  "fetchAllPosts",

  async (id: string) => {
    const response = await getPostsByUserId(id);
    console.log(response);
    return response;
  }
);
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostByPostId.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        state.post = action.payload;
      }
    });

    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        state.allPosts = action.payload;
      }
    });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
