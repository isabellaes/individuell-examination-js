//interface

interface Post {
  id: number;
  body: string;
  title: string;
  userId: number;
}

interface PostComment {
  postId: string;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface ApiResponse {
  data: User | Post[] | PostComment[];
  status: number;
}

interface ApiError {
  message: any;
}

export type { Post, PostComment, User, ApiResponse, ApiError };
