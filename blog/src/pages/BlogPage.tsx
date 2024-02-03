import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { getPostByUserId, getUser } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";

const BlogPage = () => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();
  const params = useParams<{ Id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(params.Id);
    const fetchData = async () => {
      try {
        if (params.Id) {
          const user = await getUser(params.Id);
          if (typeof user === "object") {
            setUser(user);
          }
          const posts = await getPostByUserId(params.Id);
          if (typeof posts === "object" && Array.isArray(posts)) {
            setPosts(posts);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);

  function handlePageClick(id: string): void {
    //navigate to postPage
    navigate(`/post/${id}`);
  }

  return (
    <div className="blogPage">
      <main>
        <h1>Posts</h1>

        {posts?.map((post) => (
          <div onClick={() => handlePageClick(post.id)}>
            <BlogPost key={post.id} post={post}></BlogPost>
          </div>
        ))}
      </main>
      <aside>
        <h2>{user?.name}</h2>
      </aside>
    </div>
  );
};

export default BlogPage;
