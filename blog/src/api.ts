import axios from "axios";
import { User, Post, ApiError, ApiResponse } from "./types";
const url = "https://jsonplaceholder.typicode.com/";

export const getAllUsers = async (): Promise<
  ApiResponse<User[]> | ApiError
> => {
  try {
    const result = await axios.get<User[]>(`${url}/users`);
    return { data: result.data, status: result.status };
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};

export const getAllPosts = async (): Promise<
  ApiResponse<Post[]> | ApiError
> => {
  try {
    const result = await axios.get<Post[]>(`${url}/posts`);
    return { data: result.data, status: result.status };
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};

export const deletePostById = async (
  id: string
): Promise<ApiResponse<string> | ApiError> => {
  try {
    const result = await axios.delete<ApiResponse<string>>(
      `${url}/posts/${id}`
    );
    return { data: id, status: result.status };
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};

export const updatePost = async (
  post: Post
): Promise<ApiResponse<Post> | ApiError> => {
  try {
    const result = await axios.put<Post>(`${url}/posts/${post.id}`, {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    });

    return { data: result.data, status: result.status };
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};

export const createPost = async (
  post: Post
): Promise<ApiResponse<Post> | ApiError> => {
  try {
    const result = await axios.post<Post>(`${url}/posts/`, {
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
    return { data: result.data, status: result.status };
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};
