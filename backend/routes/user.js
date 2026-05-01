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

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng này!" });
    }

    res.json(user);
  } catch (error) {
    console.error("Lỗi lấy chi tiết user:", error);
    res.status(500).json({ message: "Lỗi server khi truy vấn user" });
  }
});

module.exports = router;
