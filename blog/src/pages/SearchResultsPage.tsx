import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { NavLink } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";

const SearchResultsPage = () => {
  const [user, setUsers] = useState<User[]>();
  const [post, setPosts] = useState<Post[]>();
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.search.users);
  const posts = useSelector((state: RootState) => state.search.posts);

  useEffect(() => {
    if (users) setUsers(users);
  }, [users]);
  useEffect(() => {
    if (posts) setPosts(posts);
  }, [posts]);

  return (
    <div className="home-container">
      <main>
        <h1>Searchresult</h1>

        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              <NavLink to={`/blog/${user.id}`}>{user.name}</NavLink>
            </li>
          ))}
          {posts?.map((post) => (
            <li key={post.id}>
              <BlogPost post={post}></BlogPost>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default SearchResultsPage;
