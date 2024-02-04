import { useEffect, useState } from "react";
import { Post } from "../types";
import { NavLink, useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";
import { fetchAllPosts } from "../store/postSlice";

const BlogPage = () => {
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
    <div className="blogPage">
      <main>
        <h1>Posts</h1>

        {posts?.map((post) => (
          <div key={post.id}>
            <BlogPost post={post} />
            <NavLink to={`/post/${post.id}`}>Read moore</NavLink>
          </div>
        ))}
      </main>
      <aside></aside>
    </div>
  );
};

export default BlogPage;
