import { useState, useEffect } from "react";
import { getCommentsByPostId, getPostsByPostId } from "../api";
import { Post, PostComment } from "../types";
import { useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import BlogPostComment from "../components/BlogPostComment";

const PostPage = () => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<PostComment[]>();
  const params = useParams<{ Id: string }>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.Id) {
          const comments = await getCommentsByPostId(params.Id);
          if (typeof comments === "object" && Array.isArray(comments)) {
            setComments(comments);
          }
          const post = await getPostsByPostId(params.Id);
          if (typeof post === "object") {
            setPost(post);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {post ? <BlogPost post={post}></BlogPost> : <></>}
      {comments?.map((comment) => (
        <BlogPostComment key={comment.id} comment={comment}></BlogPostComment>
      ))}
    </div>
  );
};

export default PostPage;
