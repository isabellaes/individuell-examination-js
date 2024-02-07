import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../store/store";
import {
  setSearchResultPosts,
  setSearchResultUsers,
} from "../store/searchSlice";

const Header = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const posts = useSelector((state: RootState) => state.post.allPosts);

  function handleSearch(searchWord: string) {
    if (searchWord) {
      const resultUsers = users.filter(
        (user) => user.name === searchWord || user.username === searchWord
      );

      const resultPosts = posts.filter(
        (post) =>
          post.title.includes(searchWord) || post.body.includes(searchWord)
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
            onChange={(e) => handleSearch(e.currentTarget.value)}
          />
          <i className="bx bx-search"></i>
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
