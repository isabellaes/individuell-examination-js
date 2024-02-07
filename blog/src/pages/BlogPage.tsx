import { useEffect, useState } from "react";
import { Post } from "../types";
import { useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>();
  const params = useParams<{ Id: string }>();

  const allPosts = useSelector((state: RootState) => state.post.allPosts);

  useEffect(() => {
    if (allPosts && params.Id) {
      const posts = allPosts.filter(
        (post) => post.userId === Number(params.Id)
      );
      setPosts(posts);
    }
  }, [allPosts]);

  return (
    <div className="blogPage">
      <main>
        <h1>Posts</h1>

        {posts?.map((post) => (
          <div key={post.id}>
            <BlogPost post={post} />
          </div>
        ))}
      </main>
      <aside></aside>
    </div>
  );
};

export default BlogPage;
