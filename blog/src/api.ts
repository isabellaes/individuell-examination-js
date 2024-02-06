//api calls
import axios, { AxiosResponse } from "axios";
import { User, Post, PostComment, ApiResponse, ApiError } from "./types";
const url = "https://jsonplaceholder.typicode.com/";

export const getAllUsers = async (): Promise<User[] | ApiError> => {
  try {
    const data = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users/"
    );
    return data.data;
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};

export const getAllPosts = async (): Promise<Post[] | ApiError> => {
  try {
    const data = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts/"
    );
    return data.data;
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};

export const deletePostById = async (id: string): Promise<AxiosResponse> => {
  try {
    const result = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return result;
  } catch (error) {
    return error as AxiosResponse;
  }
};

export const updatePost = async (post: Post): Promise<Post | string> => {
  try {
    const result = await axios.put<Post>(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
      }
    );

    return result.data;
  } catch (error) {
    return "Error accurd during fetch";
  }
};

export const createPost = async (post: Post): Promise<Post | string> => {
  try {
    const result = await axios.post<Post>(
      `https://jsonplaceholder.typicode.com/posts/`,
      {
        title: post.title,
        body: post.body,
        userId: post.userId,
      }
    );
    return result.data;
  } catch (error) {
    return "Error accurd during fetch";
  }
};

/* 
export const getCommentsByPostId = async (
  id: string
): Promise<ApiResponse<PostComment[]> | ApiError> => {
  try {
    const data = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return data;
  } catch (error) {
    return { message: "An error occurred during the API call.", status: 500 };
  }
};

*/
