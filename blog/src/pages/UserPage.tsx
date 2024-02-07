import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { User } from "../types";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";
import { logIn, logOut } from "../store/userSlice";
import { setPostsByUser } from "../store/postSlice";

const UserPage = () => {
  const [user, setUser] = useState<User | null>();
  const [userInput, setUserInput] = useState<string>();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  function handleLogin() {
    if (userInput) {
      dispatch(logIn(Number(userInput)));
      dispatch(setPostsByUser(Number(userInput)));
    }
  }

  function LogOut() {
    dispatch(logOut());
    setUser(null);
  }

  return (
    <>
      <div className="blogPage">
        <main>
          <h1>Your personal Blog!</h1>
          {user ? <Outlet /> : <></>}
        </main>
        <aside>
          {user ? (
            <>
              <h2>{user?.name}</h2>

              <button onClick={LogOut}>Log out</button>
              <nav>
                <ul>
                  <li>
                    <Link to={`profile/${user.id}`}>Profile</Link>
                  </li>
                  <li>
                    <Link to={`posts/${user.id}`}>My Posts</Link>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <>
              <div>
                {/* Simulate login with no security */}
                <label htmlFor="input-id"> Enter user ID:</label>
                <input
                  id="input-id"
                  type="text"
                  placeholder="Number 1-10"
                  onChange={(e) => setUserInput(e.currentTarget.value)}
                ></input>
                <button onClick={handleLogin}>Log in</button>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default UserPage;
