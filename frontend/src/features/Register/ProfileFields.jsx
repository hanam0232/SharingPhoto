import DefaultAvatar from "../../assets/Z_defaultAvatar.png";
import { useState } from "react";

const ProfileFields = ({ onRegister, onBack }) => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    birthDate: "",
    avatar: null,
  });

  //Chon file can upload (image)
  const handleFileChange = (e) => {
    setProfileData({ ...profileData, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profileData.fullName || !profileData.birthDate) {
      alert("Vui lòng nhập tên và ngày sinh");
      return;
    }

    //Gui ve backend
    onRegister(profileData);
  };

  return (
    <div className="register-box">
      <h2>Thông tin cá nhân</h2>

      {/* Ten hien thi */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên hiển thị:</label>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            required
            onChange={(e) =>
              setProfileData({ ...profileData, fullName: e.target.value })
            }
          />
        </div>

        {/* Ngay sinh */}
        <div className="form-group">
          <label>Ngày sinh:</label>
          <input
            type="date"
            required
            onChange={(e) =>
              setProfileData({ ...profileData, birthDate: e.target.value })
            }
          />
        </div>

        {/* Anh dai dien */}
        <div className="form-group">
          <label>Ảnh đại diện:</label>
          <div style={{ marginBottom: "10px" }}>
            <img
              src={
                profileData.avatar
                  ? URL.createObjectURL(profileData.avatar)
                  : DefaultAvatar
              }
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              alt="Preview"
            />
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Dang ky tai khoan */}
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button type="button" onClick={onBack}>
            Quay lại
          </button>
          <button type="submit">Đăng ký</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileFields;
