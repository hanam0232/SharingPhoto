import { useNavigate } from "react-router-dom";
import AccountFields from "./AccountFields";
import ProfileFields from "./ProfileFields";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [allData, setAllData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // Sau khi xong Bước 1
  const handleNextStep = (accountData) => {
    setAllData({ ...allData, ...accountData });
    setStep(2);
  };

  // Xử lý gửi dữ liệu về backend sau khi xong Bước 2
  const handleFinalRegister = async (profileData) => {
    const finalData = new FormData();
    finalData.append("username", allData.username);
    finalData.append("password", allData.password);
    finalData.append("fullName", profileData.fullName);
    finalData.append("birthDate", profileData.birthDate);

    if (profileData.avatar) {
      finalData.append("avatar", profileData.avatar);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        finalData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      // Thông báo thành công
      alert("Đăng ký thành công!");
      console.log(response.data);

      // Điều hướng sang trang đăng nhập
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response?.data || error.message);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="register-container">
      {step === 1 ? (
        <AccountFields onNext={handleNextStep} formData={allData} />
      ) : (
        <ProfileFields
          onBack={() => setStep(1)}
          onRegister={handleFinalRegister}
        />
      )}
    </div>
  );
};

export default Register;
