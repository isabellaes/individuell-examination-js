import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updatePost, createPost, getAllPosts, deletePostById } from "../api";
import { ApiError, ApiResponse, Post } from "../types";

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

  async (): Promise<ApiResponse<Post[]> | ApiError> => {
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
  async (post: Post): Promise<ApiResponse<Post> | ApiError> => {
    try {
      const response = await updatePost(post);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);

export const fetchCreatePost = createAsyncThunk(
  "createPost",
  async (post: Post): Promise<ApiResponse<Post> | ApiError> => {
    try {
      const response = await createPost(post);

      return response;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  "deletePost",
  async (id: string): Promise<ApiResponse<string> | ApiError> => {
    try {
      const response = await deletePostById(id);
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
      if (action.payload.status === 200 && "data" in action.payload) {
        const posts: Post[] = action.payload.data;
        state.allPosts = posts;
      }
    });

    builder.addCase(fetchUpdatePost.fulfilled, (state, action) => {
      if (action.payload.status === 200 && "data" in action.payload) {
        const updatedPost = action.payload.data;
        state.postsByUser = state.postsByUser.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      }
    });

    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      if (action.payload.status === 201 && "data" in action.payload) {
        state.postsByUser.push(action.payload.data);
      }
    });

    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      if (action.payload.status === 200 && "data" in action.payload) {
        const id = Number(action.payload.data);
        const post = state.postsByUser.find((post) => post.id === id);
        if (post) {
          state.postsByUser = state.postsByUser?.filter(
            (p) => p.id !== post.id
          );
        }
      }
    });
  },
});

export const { setPostsByUser } = postSlice.actions;
export default postSlice.reducer;
