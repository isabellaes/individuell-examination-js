import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { User } from "../types";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";
import { fetchUserById } from "../store/userSlice";

const UserPage = () => {
  const [user, setUser] = useState<User>();

  const dispatch = useAppDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  function handleInput(input: string) {
    dispatch(fetchUserById(input));
  }
  return (
    <>
      <div className="blogPage">
        <main>
          <h1>Your personal Blog!</h1>

          <Outlet />
        </main>
        <aside>
          {user ? (
            <>
              <h2>{user?.name}</h2>
              <nav>
                <ul>
                  <li>
                    <Link to={`profile/${user.id}`}>Profile</Link>
                  </li>
                  <li>
                    <Link to={`posts/${user.id}`}>My Posts</Link>
                  </li>
                  <li>
                    <Link to={`create/${user.id}`}>Create Post</Link>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="input-id"> Enter your id:</label>
                <input
                  id="input-id"
                  type="text"
                  onChange={(e) => handleInput(e.currentTarget.value)}
                ></input>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default UserPage;
