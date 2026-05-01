import "./AllStyleCss/LogoutConfirmBox.css";

const LogoutConfirmBox = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-overlay">
      <div className="logout-modal-box">
        <h3 className="logout-title">Xác nhận</h3>
        <p className="logout-message">Bạn có chắc chắn muốn đăng xuất không?</p>

        <div className="logout-button-group">
          <button onClick={onCancel} className="stay-btn">
            Ở lại
          </button>
          <button onClick={onConfirm} className="leave-btn">
            Rời đi
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmBox;
