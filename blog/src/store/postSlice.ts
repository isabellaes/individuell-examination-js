import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updatePost, createPost, getAllPosts } from "../api";
import { ApiError, Post } from "../types";

interface PostState {
  allPosts: Post[];
  postsByUser: Post[];
}

const initialState: PostState = {
  allPosts: [],
  postsByUser: [],
};

export const fetchAllPosts = createAsyncThunk(
  "allPosts",

  async (): Promise<Post[] | ApiError> => {
    try {
      const response = await getAllPosts();
      return response;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);
export const fetchUpdatePost = createAsyncThunk(
  "updatePost",
  async (post: Post): Promise<Post | string> => {
    try {
      const response = await updatePost(post);
      return response;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);

export const fetchCreatePost = createAsyncThunk(
  "createPost",
  async (post: Post): Promise<Post | string> => {
    try {
      const response = await createPost(post);
      return response;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<number>) => {
      const post = state.allPosts.find((post) => post.id === action.payload);
      if (post) {
        state.postsByUser = state.postsByUser?.filter(
          (post) => post.id !== action.payload
        );
      }
    },

    setPostsByUser: (state, action: PayloadAction<number>) => {
      const posts = state.allPosts.filter(
        (post) => post.userId === action.payload
      );
      if (posts) {
        state.postsByUser = posts;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        const posts: Post[] = action.payload;
        state.allPosts = posts;
      }
    });

    builder.addCase(fetchUpdatePost.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        const updatedPost = action.payload;
        state.postsByUser = state.postsByUser.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      }
    });

    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        console.log(action.payload);
        state.postsByUser.push(action.payload);
      }
    });
  },
});

export const { deletePost, setPostsByUser } = postSlice.actions;
export default postSlice.reducer;
