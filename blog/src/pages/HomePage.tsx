import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BlogPost from "../components/BlogPost";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>();
  const [user, setUser] = useState<User>();
  const currentUsers = useSelector((state: RootState) => state.user.users);
  const [posts, setPosts] = useState<Post[]>();
  const allPosts = useSelector((state: RootState) => state.post.allPosts);

  useEffect(() => {
    if (currentUsers) setUsers(currentUsers);
  }, [user]);

  function handleSelectUser(user: User) {
    const posts = allPosts.filter((post) => post.userId === user.id);
    if (posts) {
      setPosts(posts);
      setUser(user);
    }
  }

  return (
    <div className="layout">
      <main>
        <h1>Posts by user {user?.name}</h1>
        <div className="mobile row-wrap">
          <ul>
            {users?.map((user) => (
              <li key={user.id} onClick={() => handleSelectUser(user)}>
                {user.name} |
              </li>
            ))}
          </ul>
        </div>

        {posts ? (
          posts.map((post) => (
            <div className="row" key={post.id}>
              <BlogPost post={post} />
            </div>
          ))
        ) : (
          <p>Select a user to see posts.</p>
        )}
      </main>
      <aside className="desktop">
        <ul>
          {users?.map((user) => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default HomePage;
