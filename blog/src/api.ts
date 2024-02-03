//api calls
import axios from "axios";
import { User, Post } from "./types";
const url = "https://jsonplaceholder.typicode.com/";

export const getUsers = async (): Promise<User[] | string> => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users/"
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
  }
};

export const getUser = async (id: string): Promise<User | string> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
  }
};

export const getPostsByPostId = async (id: string): Promise<Post | string> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
  }
};

export const getPostByUserId = async (id: string): Promise<Post | string> => {
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
): Promise<Post | string> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
  } catch (error) {
    return "An error occurred during the API call.";
  }
};
