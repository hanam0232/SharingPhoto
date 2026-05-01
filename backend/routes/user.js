const express = require("express");
const router = express.Router();
const User = require("../models/User");

//API lay danh sach nguoi dung
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select("username fullName avatarUrl");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách người dùng" });
  }
});

module.exports = router;
