import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutConfirmBox from "./LogoutConfirmBox";

const LogoutButton = ({ className, style }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // Hàm thực hiện Logout khi nhấn "Rời đi"
  const handleFinalLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowConfirm(false); // Đóng box
    navigate("/login", { replace: true });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)} // Nhấn vào chỉ mới hiện Box
        className={className}
        style={{
          cursor: "pointer",
          padding: "8px 16px",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          ...style,
        }}
      >
        Đăng xuất
      </button>

      {/* Render Box xác nhận nếu trạng thái là true */}
      {showConfirm && (
        <LogoutConfirmBox
          onConfirm={handleFinalLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default LogoutButton;
