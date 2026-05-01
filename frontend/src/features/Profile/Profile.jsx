import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostList from "../PostList/PostList";
import PhotoList from "../PhotoList/PhotoList";
import "./Css/Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [viewMode, setViewMode] = useState("info");
  const [isZoomed, setIsZoomed] = useState(false);

  const me = JSON.parse(localStorage.getItem("user"));
  const isMe = id === "me" || id === me?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setViewMode("info");

        if (isMe) {
          setUserData({ ...me, birthDate: "2004-10-20T00:00:00.000Z" });
        } else {
          const res = await axios.get(`http://localhost:5000/api/users/${id}`);
          setUserData(res.data);
        }
      } catch (err) {
        console.error("Lỗi fetch user:", err);
      }
    };

    fetchUserData();
  }, [id, isMe]);

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Ngày không hợp lệ";

    return date
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };

  if (!userData) return <div className="loading">Đang tải dữ liệu...</div>;

  // Xử lý render các danh sách dựa trên viewMode
  if (viewMode === "posts") {
    return (
      <PostList userId={id} onBack={() => setViewMode("info")} isMe={isMe} />
    );
  }
  if (viewMode === "photos") {
    return (
      <PhotoList userId={id} onBack={() => setViewMode("info")} isMe={isMe} />
    );
  }

  return (
    <div className="profile-layout">
      <div className="profile-header-center">
        {/* Avatar hình tròn, click vào để Zoom */}
        <div className="avatar-wrapper" onClick={() => setIsZoomed(true)}>
          <img
            src={`http://localhost:5000/${userData.avatarUrl}`}
            className="avatar-large-circle"
            alt="profile"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>

        <div className="user-detail-box">
          <h1 className="profile-title">{userData.fullName}</h1>
          <p className="bio-text">
            Ngày sinh: {formatDate(userData.birthDate)}
          </p>

          {!isMe && (
            <div className="action-group">
              <button
                className="btn-outline"
                onClick={() => setViewMode("posts")}
              >
                Xem bài đăng
              </button>
              <button
                className="btn-outline"
                onClick={() => setViewMode("photos")}
              >
                Xem ảnh
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lớp phủ xem ảnh vuông khi click vào avatar */}
      {isZoomed && (
        <div
          className="image-viewer-overlay"
          onClick={() => setIsZoomed(false)}
        >
          <div className="image-viewer-content">
            <img
              src={`http://localhost:5000/${userData.avatarUrl}`}
              className="avatar-square-view"
              alt="zoom-avatar"
              onError={(e) => (e.target.src = "/default-avatar.png")}
            />
            <p className="close-tip">Click vào vùng tối để đóng</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
