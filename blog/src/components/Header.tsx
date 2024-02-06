import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../store/store";
import {
  setSearchResultPosts,
  setSearchResultUsers,
} from "../store/searchSlice";

const Header = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const posts = useSelector((state: RootState) => state.post.allPosts);
  function handleSearch() {
    if (searchWord) {
      //sök på användare -> gå till blogPage med den usern

      const resultUsers = users.filter(
        (user) => user.name === searchWord || user.username === searchWord
      );

      //sök på post (titel, innehåll) -> Ha en egen sida med sökresultat?

      const resultPosts = posts.filter(
        (post) => post.title === searchWord || post.body.includes(searchWord)
      );

      if (resultUsers && Array.isArray(resultUsers)) {
        dispatch(setSearchResultUsers(resultUsers));
      }

      if (resultPosts && Array.isArray(resultPosts)) {
        dispatch(setSearchResultPosts(resultPosts));
      }
    }

    navigation("/search");
  }

  return (
    <header>
      <div>
        <h1 onClick={() => navigation("/")}>BLOGG</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-field"
            placeholder="Search..."
            onChange={(e) => setSearchWord(e.currentTarget.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <i className="bx bx-search"></i>
          </button>
        </div>
      </div>
      <div>
        <nav>
          <ul>
            <li>Home</li>
            <li>
              <Link to={"user"}>My blog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
