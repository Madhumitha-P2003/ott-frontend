import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const active = (path) => location.pathname === path;

  return (
    <div className="navBar">
      <div className="nav-left">
        <img
          className="logoImg"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix"
          onClick={() => navigate("/home")}
        />

        <ul className="nav-menu">
          <li className={active("/home") ? "active" : ""} onClick={() => navigate("/home")}>Home</li>
          <li className={active("/tv") ? "active" : ""} onClick={() => navigate("/tv")}>TV Shows</li>
          <li className={active("/movies") ? "active" : ""} onClick={() => navigate("/movies")}>Movies</li>
          <li className={active("/new") ? "active" : ""} onClick={() => navigate("/new")}>New & Popular</li>
          <li className={active("/mylist") ? "active" : ""} onClick={() => navigate("/mylist")}>My List</li>
          <li className={active("/languages") ? "active" : ""} onClick={() => navigate("/languages")}>
            Browse by Languages
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
