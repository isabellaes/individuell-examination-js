//interface

interface Post {
  id: string;
  body: string;
  title: string;
  userId: number;
}

interface PostComment {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface ApiResponse {
  data: User | User[] | Post[] | PostComment[];
  status: number;
}

interface ApiError {
  message: any;
}

export type { Post, PostComment, User, ApiResponse, ApiError };
