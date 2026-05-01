const PhotoList = ({ userId, onBack, isMe }) => {
  return (
    <div className="list-wrapper">
      <div className="header-sticky">
        {!isMe && (
          <button className="back-link-btn" onClick={onBack}>
            ← Quay lại Profile
          </button>
        )}
        <h2>Bộ sưu tập ảnh</h2>
      </div>
      <div className="photo-grid-layout">
        {/* Sau này render mảng 2 chiều ở đây */}
        <p className="placeholder">Người dùng này chưa tải ảnh nào lên.</p>
      </div>
    </div>
  );
};

export default PhotoList;
