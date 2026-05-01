import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AllStyleCss/Sidebar.css";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const me = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all");
        const others = res.data.filter((u) => u._id !== me?.id);
        setUsers(others);
      } catch (err) {
        console.log("Lỗi tải danh sách người dùng", err);
      }
    };
    fetchUsers();
  }, [me?.id]);

  return (
    <aside className="sidebar-container">
      {users.map((u) => (
        <div
          key={u._id}
          className="user-block"
          onClick={() => navigate(`/profile/${u._id}`)}
        >
          <img
            src={`http://localhost:5000/${u.avatarUrl}`}
            className="avatar-1"
            alt="avatar"
          />
          <div className="user-info">
            <span className="fullName">{u.fullName}</span>
            <span className="stat-2">{u.photoCount || 0} pictures</span>
            <span className="stat-3">{u.commentCount || 0} comments</span>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
