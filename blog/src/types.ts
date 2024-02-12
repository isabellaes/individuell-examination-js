//interface

interface Post {
  id: number;
  body: string;
  title: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
}

export type { Post, User, ApiResponse, ApiError };
