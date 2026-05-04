import { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = ({ onBack }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const me = JSON.parse(localStorage.getItem("user"));

  const handleImageChange = (e) => {
    const file = e.target.file[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); //base64
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/posts/create", {
        title,
        photo: image,
        userId: me.id,
      });
      alert("Đăng bài thành công!");
      onBack(); // Quay lại trang profile
    } catch (error) {
      alert("Lỗi khi đăng bài", error);
    }
  };

  return (
    <div className="create-post-container">
      <button onClick={onBack} className="back-btn">
        ← Quay lại
      </button>

      <form onSubmit={handleSubmit} className="post-form">
        <h2>Tạo bài viết mới</h2>
        <input
          type="text"
          placeholder="Tiêu đề bài đăng"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {image && <img src={image} alt="Preview" className="preview-img" />}
        <button type="submit" className=" submit-btn">
          Đăng tải
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
