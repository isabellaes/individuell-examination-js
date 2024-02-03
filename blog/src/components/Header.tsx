import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();

  return (
    <header>
      <h1 onClick={() => navigation("/")}>BLOGG</h1>
      <div className="search-container">
        <input type="text" className="search-field" placeholder="Search..." />
        <button className="search-button">
          <i className="bx bx-search"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
