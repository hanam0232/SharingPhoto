const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    avatarUrl: { type: String, default: "" }, // Lưu đường dẫn ảnh
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
