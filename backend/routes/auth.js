const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const multer = require("multer");
const router = express.Router();

//Luu tru anh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const upload = multer({ storage });
//===========================================================================================================
//API dang ky   /api/auth/register
router.post("/register", upload.single("avatar"), async (req, res) => {
  console.log("Dữ liệu Backend nhận được:", req.body);
  try {
    const { username, password, fullName, birthDate } = req.body;
    //Kiem tra user ton tai chua
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username đã tồn tại" });
    //Ma hoa mat khau
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Tao User moi
    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      birthDate,
      avatarUrl: req.file ? req.file.path : "", //Luu path new upload anh
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
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    //Tim User
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    //Kiem tra mat khau
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    //Tao token (1 day)
    const token = jwt.sign({ id: user._id }, "SECRET_KEY_CUA_BAN", {
      expiresIn: "100s",
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
