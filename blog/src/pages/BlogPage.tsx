import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [user, setUser] = useState<User>();
  const params = useParams<{ Id: string }>();

  const allPosts = useSelector((state: RootState) => state.post.allPosts);
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    if (allPosts && params.Id) {
      const posts = allPosts.filter(
        (post) => post.userId === Number(params.Id)
      );
      setPosts(posts);
    }
  }, [allPosts]);

  useEffect(() => {
    if (users && params.Id) {
      const user = users.find((user) => user.id === Number(params.Id));
      setUser(user);
    }
  }, [users]);

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
      <aside>
        <h1>{user?.name}</h1>
      </aside>
    </div>
  );
};

export default BlogPage;
