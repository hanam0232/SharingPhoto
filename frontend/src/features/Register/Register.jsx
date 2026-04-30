import AccountFields from "./AccountFields";
import ProfileFields from "./ProfileFields";
import { useState } from "react";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [step, setStep] = useState(1);
  const [allData, setAllData] = useState({
    username: "",
    password: "",
  });

  //Sau khi xong Buoc 1
  const handleNextStep = (accountData) => {
    setAllData({ ...allData, ...accountData });
    setStep(2);
  };

  //Xu ly gui du lieu ve backend sau khi xong Buoc 2
  const handleFinalRegister = async (profileData) => {
    const finalData = new FormData();
    finalData.append("username", profileData.username);
    finalData.append("password", profileData.password);
    finalData.append("fullName", profileData.fullName);
    finalData.append("birthDate", profileData.birthDate);
    if (profileData.avatar) {
      finalData.append("avatar", profileData.avatar);
    }

    //Bao loi neu co
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        finalData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      alert("Đăng ký thành công!");
      console.log(response.data);
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
