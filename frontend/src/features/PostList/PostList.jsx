const PostList = ({ userId, onBack, isMe }) => {
  return (
    <div className="list-wrapper">
      <div className="header-sticky">
        {!isMe && (
          <button className="back-link-btn" onClick={onBack}>
            ← Quay lại Profile
          </button>
        )}
        <h2>Danh sách bài đăng</h2>
      </div>
      <div className="content-scroll">
        {/* Sau này Map PostItem (Khối 6) ở đây */}
        <p className="placeholder">Chưa có bài đăng nào để hiển thị.</p>
      </div>
    </div>
  );
};

export default PostList;
