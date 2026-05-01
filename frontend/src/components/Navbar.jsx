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
          <Link to="/my-posts">Bài đăng</Link>
          <Link to="/my-photos">Ảnh của tôi</Link>
          <Link to="/profile/me">Profile</Link>
        </div>
        {/* Avatar */}
        <img
          src={`http://localhost:5000/${user?.avatarUrl}`}
          className="avatar-me"
          alt="me"
        />
        {/* <img
          src={
            me?.avatarUrl
              ? `http://localhost:5000/${me.avatarUrl}`
              : "/default.png"
          }
          alt="me"
          className="avatar-4"
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;
