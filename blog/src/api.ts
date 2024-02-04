//api calls
import axios, { AxiosResponse } from "axios";
import { User, Post, PostComment } from "./types";
const url = "https://jsonplaceholder.typicode.com/";

export const getAllUsers = async (): Promise<User[] | string> => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users/"
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log("error");
    return "An error occurred during the API call.";
  }
};

export const getUserById = async (id: string): Promise<User | string> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
  }
};

export const getPostByPostId = async (id: string): Promise<Post | string> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
  }
};

export const getPostsByUserId = async (
  id: string
): Promise<Post[] | string> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}/posts`
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
  }
};

export const getCommentsByPostId = async (
  id: string
): Promise<PostComment[] | string> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
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
