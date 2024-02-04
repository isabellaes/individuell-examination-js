import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../types";
import BlogPost from "./BlogPost";
import { useSelector } from "react-redux";
import { fetchAllPosts } from "../store/postSlice";
import { useAppDispatch, RootState } from "../store/store";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  const params = useParams<{ Id: string }>();

  const dispatch = useAppDispatch();
  const allPosts = useSelector((state: RootState) => state.post.allPosts);

  useEffect(() => {
    if (params.Id) {
      dispatch(fetchAllPosts(params.Id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (allPosts) setPosts(allPosts);
  }, [allPosts]);

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <BlogPost post={post} />
          <button>Edit post</button>
          <button>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Posts;
