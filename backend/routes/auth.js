const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const multer = require("multer");
const router = express.Router();

// Cấu hình lưu trữ ảnh vật lý
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const upload = multer({ storage });

//===========================================================================================================
// API Đăng ký: /api/auth/register
router.post("/register", upload.single("avatar"), async (req, res) => {
  console.log("Dữ liệu Text nhận được:", req.body);
  console.log("Dữ liệu File nhận được:", req.file); // Kiểm tra thông tin file tại đây

  try {
    const { username, password, fullName, birthDate } = req.body;

    // Lấy tên file đã được lưu bởi multer. Nếu không có file, để chuỗi rỗng hoặc giá trị mặc định.
    const avatarUrl = req.file ? `uploads/${req.file.filename}` : "";

    // Kiểm tra user tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username đã tồn tại" });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo User mới
    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      birthDate,
      avatarUrl: avatarUrl, // Lưu tên file vào database (ví dụ: 171483..._avatar.jpg)
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "Đăng ký thành công", user: { username, fullName } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi Server Register", error: error.message });
  }
});

//===========================================================================================================
// API Đăng nhập: /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mật khẩu không chính xác" });

    // Tạo token (nên để thời gian dài hơn 100s để test dễ hơn, ví dụ: "1d")
    const token = jwt.sign({ id: user._id }, "SECRET_KEY_CUA_BAN", {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Lỗi Login tại Backend:", error);
    res.status(500).json({ message: "Lỗi Server Login" });
  }
});

module.exports = router;
