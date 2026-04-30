import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const AccountFields = ({ onNext, formData }) => {
  const [localData, setLocalData] = useState({
    username: formData.username || "",
    password: formData.password || "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localData.username || !localData.password) {
      setError("Vui lòng nhập đủ thông tin");
      return;
    }
    if (localData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 kí tự");
      return;
    }
    if (localData.password !== localData.confirmPassword) {
      setError("Mật khẩu không trùng khớp");
      return;
    }
    setError("");
    onNext({ username: localData.username, password: localData.password });
  };

  return (
    <div className="register-box">
      <h2>Đăng kí tài khoản</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={localData.username}
          onChange={(e) =>
            setLocalData({ ...localData, username: e.target.value })
          }
          required
        />

        {/* Password */}
        <div className="password-box" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={localData.password}
            onChange={(e) =>
              setLocalData({ ...localData, password: e.target.value })
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

        {/* Confirm Password */}
        <div className="password-box" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={localData.confirmPassword}
            onChange={(e) =>
              setLocalData({ ...localData, confirmPassword: e.target.value })
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

        {/* Next để sang bước nhập Profile(Register) */}
        <button type="submit" className="btn-next">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default AccountFields;
