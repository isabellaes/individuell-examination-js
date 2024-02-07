import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../store/store";
import { setSearchResultPosts } from "../store/searchSlice";
import { useState, useEffect } from "react";
import { setPostsByUser } from "../store/postSlice";
import { logOut, logIn } from "../store/userSlice";
import { User } from "../types";

const Header = () => {
  const [user, setUser] = useState<User | null>();
  const [userInput, setUserInput] = useState<string>();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const posts = useSelector((state: RootState) => state.post.allPosts);
  const currentUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);
  function handleLogOut() {
    dispatch(logOut());
    setUser(null);
    navigation("/");
  }

  function handleLogIn() {
    if (userInput) {
      dispatch(logIn(Number(userInput)));
      dispatch(setPostsByUser(Number(userInput)));
    }
  }

  function handleSearch(searchWord: string) {
    if (searchWord) {
      const resultPosts = posts.filter(
        (post) =>
          post.title.includes(searchWord) || post.body.includes(searchWord)
      );

      if (resultPosts && Array.isArray(resultPosts)) {
        dispatch(setSearchResultPosts(resultPosts));
      }

      navigation("/search");
    }
  }

  return (
    <header>
      <div className="search-container">
        <input
          type="text"
          className="search-field"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />
        <i className="bx bx-search"></i>
      </div>
      <h1 onClick={() => navigation("/")}>BLOG</h1>
      <div className="NavBar">
        {user ? (
          <>
            <nav>
              <ul>
                <li>
                  <Link to={"/home"}>Home</Link>
                </li>
                <li>
                  <Link to={"/"}>My blog</Link>
                </li>
              </ul>
            </nav>
            <button onClick={() => handleLogOut()}>Log out</button>
          </>
        ) : (
          <>
            <nav>
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
              </ul>
            </nav>
            <div>
              <label htmlFor="input-id"> Enter user ID:</label>
              <input
                id="input-id"
                type="text"
                placeholder="Number 1-10"
                onChange={(e) => setUserInput(e.currentTarget.value)}
              ></input>
              <button onClick={() => handleLogIn()}>Log in</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
