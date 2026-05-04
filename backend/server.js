const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();
const app = express();

//==============================================
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}
app.use("/uploads", express.static("uploads"));
//==============================================

app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/user"));

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

//==============================================
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
//==============================================

app.get("/", (req, res) => {
  res.send("Server Sharing Photo đang chạy...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại port: ${PORT}`);
});
