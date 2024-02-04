import { useEffect, useState } from "react";
import { User } from "../types";
import { fetchAllUsers } from "../store/userSlice";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) setUsers(user);
  }, [user]);

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
