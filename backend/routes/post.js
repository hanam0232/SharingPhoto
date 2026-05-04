router.post("/create", async (req, res) => {
  try {
    const { title, photo, userId } = req.body;
    const newPost = new Post({ title, photo, userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng bài" });
  }
});
