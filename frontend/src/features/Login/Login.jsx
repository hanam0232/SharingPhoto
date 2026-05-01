import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );
      localStorage.setItem("token", res.data.token); // Lưu token
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Lưu thông tin user
      alert("Đăng nhập thành công!");

      navigate("/", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="register-container">
      {" "}
      {/* Dùng chung class container để căn giữa */}
      <div className="register-box">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <div className="password-box" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Navigate to --> Register (AccountFields) */}
          <p style={{ fontSize: "14px", marginBottom: "15px" }}>
            Bạn chưa có tài khoản?{" "}
            <span
              style={{
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/register")}
            >
              Đăng ký ngay
            </span>
          </p>

          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
