import { useState, useEffect } from "react";
import { getCommentsByPostId, getPostByPostId, getUserById } from "../api";
import { Post, PostComment, User } from "../types";
import { useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import BlogPostComment from "../components/BlogPostComment";

const PostPage = () => {
  const [postt, setPost] = useState<Post>();
  const [comments, setComments] = useState<PostComment[]>();
  const params = useParams<{ Id: string }>();
  const [user, setUser] = useState<User>();

  return (
    <div className="blogPage">
      <main>
        <h1>Posts</h1>

        {postt ? <BlogPost post={postt}></BlogPost> : <></>}
        {comments?.map((comment) => (
          <BlogPostComment key={comment.id} comment={comment}></BlogPostComment>
        ))}
      </main>
      <aside>
        <h2>{user?.name}</h2>
      </aside>
    </div>
  );
};

export default PostPage;
