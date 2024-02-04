import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();

  return (
    <header>
      <div>
        <h1 onClick={() => navigation("/")}>BLOGG</h1>
        <div className="search-container">
          <input type="text" className="search-field" placeholder="Search..." />
          <button className="search-button">
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
