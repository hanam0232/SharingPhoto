import { useEffect, useState } from "react";
import axios from "axios";
import "./AllStyleCss/Sidebar.css";

const Sidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <aside className="sidebar-container">
      {users.map((u) => (
        <div key={u._id} className="user-block" onClick={() => onSelectUser(u)}>
          <img
            src={`http://localhost:5000/${u.avatarUrl}`}
            className="avatar-1"
            alt="user"
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
