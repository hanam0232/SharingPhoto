const postSchema = new mongoose.Schema({
  title: String,
  photo: String, // Sẽ lưu chuỗi Base64
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
