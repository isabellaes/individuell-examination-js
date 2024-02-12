import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../store/store";
import { setSearchResultPosts } from "../store/searchSlice";
import { useState, useEffect } from "react";
import { logOut } from "../store/userSlice";
import { User } from "../types";
import LogIn from "./LogIn";

const Header = () => {
  const [user, setUser] = useState<User | null>();

  const [logInModalOpen, setLogInModalOpen] = useState<boolean>(false);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const posts = useSelector((state: RootState) => state.post.allPosts);
  const currentUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setLogInModalOpen(false);
    }
  }, [currentUser]);

  function handleLogOut() {
    dispatch(logOut());
    setUser(null);
    navigation("/");
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
      <div className="NavBar">
        {user ? (
          <>
            <h1 onClick={() => navigation("/")}>BLOG.DEV</h1>
            <nav>
              <ul>
                <li>Info | </li>
                <li onClick={() => navigation("/home")}>Home | </li>
                <li onClick={() => navigation("/")}>My blog |</li>
                <li onClick={() => handleLogOut()}>Log out</li>
              </ul>
            </nav>
          </>
        ) : (
          <>
            <h1 onClick={() => navigation("/")}>BLOG.DEV</h1>
            <nav>
              <ul>
                <li>Info | </li>
                <li onClick={() => navigation("/")}>Home | </li>
                <li onClick={() => setLogInModalOpen(true)}>Log in</li>
              </ul>
            </nav>
            {logInModalOpen ? (
              <LogIn onClose={() => setLogInModalOpen(false)} />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-field"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />
        <i className="bx bx-search"></i>
      </div>
    </header>
  );
};

export default Header;
