import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import "./AllStyleCss/Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo-text">Sharing Photo</h1>
        <LogoutButton />
      </div>

      <div className="nav-right">
        <div className="nav-links">
          {/* prettier-ignore */}
          <Link to="/profile/me/" state={{mode: "posts"}} className="nav-link">Bài đăng</Link>
          <Link
            to="/profile/me/"
            state={{ mode: "photos" }}
            className="nav-link"
          >
            Ảnh của tôi
          </Link>
          <Link to="/profile/me" state={{ mode: "info" }} className="nav-link">
            Profile
          </Link>
        </div>
        {/* Avatar */}
        <img
          src={`http://localhost:5000/${user?.avatarUrl}`}
          className="avatar-me"
          alt="me"
        />
      </div>
    </nav>
  );
};

export default Navbar;
