import { useEffect, useState } from "react";
import { User } from "../types";
import { getUsers } from "../api";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUsers();
        if (typeof result === "object" && Array.isArray(result)) {
          setUsers(result);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <main>
        <h1>Blogs by user</h1>
        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              <NavLink to={`/blog/${user.id}`}>{user.name}</NavLink>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
