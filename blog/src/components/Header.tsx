import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../store/store";
import { setSearchResultPosts } from "../store/searchSlice";
import { useState, useEffect } from "react";
import { logOut } from "../store/userSlice";
import { User } from "../types";
import LogIn from "./LogIn";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [user, setUser] = useState<User | null>();
  const [logInModalOpen, setLogInModalOpen] = useState<boolean>(false);
  const [menu, showMenu] = useState<boolean>(false);

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

  function handleShowMenu() {
    if (menu === false) {
      showMenu(true);
    } else if (menu === true) {
      showMenu(false);
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
      <div>
        <div className="mobile">
          <h1 onClick={() => navigation("/")}>BLOG.DEV</h1>
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
      </div>

      {/* Drop down menu for mobile and small devices */}
      <div className="mobile-nav">
        <MenuIcon sx={{ fontSize: "2em" }} onClick={handleShowMenu}></MenuIcon>

        {menu ? (
          <div className="drop-down-menu">
            {user ? (
              <ul>
                <li
                  onClick={() => {
                    navigation("/home");
                    handleShowMenu();
                  }}
                >
                  Home
                </li>
                <li
                  onClick={() => {
                    navigation("/");
                    handleShowMenu();
                  }}
                >
                  My blog
                </li>
                <li
                  onClick={() => {
                    handleLogOut();
                    handleShowMenu();
                  }}
                >
                  Log out
                </li>
              </ul>
            ) : (
              <ul>
                <CloseIcon onClick={() => handleShowMenu()}></CloseIcon>
                <li
                  onClick={() => {
                    navigation("/");
                    handleShowMenu();
                  }}
                >
                  Home{" "}
                </li>
                <li
                  onClick={() => {
                    setLogInModalOpen(true);
                    handleShowMenu();
                  }}
                >
                  Log in
                </li>
              </ul>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {logInModalOpen ? (
        <LogIn onClose={() => setLogInModalOpen(false)} />
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
