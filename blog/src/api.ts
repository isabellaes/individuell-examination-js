//api calls
import { ApiResponse, ApiError } from "./types";
const url = "https://jsonplaceholder.typicode.com/";

export async function FetchAllPosts(): Promise<ApiResponse | ApiError> {
  try {
    const data = fetch("https://jsonplaceholder.typicode.com/users/").then(
      (response) => response.json()
    );
    return data;
  } catch (error) {
    return {
      message: error,
    };
  }
}
