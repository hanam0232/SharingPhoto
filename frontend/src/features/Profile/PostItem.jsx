import { useState } from "react";
import "./Css/PostItem.css";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

const PostItem = ({ post }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className={`post-main-container ${isCommentOpen ? "split-view" : ""}`}>
      {/* Khối 6: Thông tin bài đăng */}
      <div className="post-card-6">
        <div className="post-header">
          <img
            src={`http://localhost:5000/${post.userAvatar}`}
            className="avatar-7"
          />
          <span className="post-title">{post.title}</span>
        </div>

        <img
          src={`http://localhost:5000/${post.photoUrl}`}
          className="photo-8"
        />

        <div className="post-footer">
          <div className="action-btn">
            <ThumbsUp size={18} /> <span>{post.likes}</span>
          </div>{" "}
          {/* 9 */}
          <div className="action-btn">
            <ThumbsDown size={18} /> <span>{post.dislikes}</span>
          </div>{" "}
          {/* 10 */}
          <div
            className="action-btn comment-trigger"
            onClick={() => setIsCommentOpen(!isCommentOpen)}
          >
            <MessageCircle size={18} /> <span>{post.comments?.length}</span>{" "}
            {/* 11 */}
          </div>
        </div>
      </div>

      {/* Khung Comment bên phải */}
      {isCommentOpen && (
        <div className="comment-panel">
          <div className="panel-header">
            <h4>Bình luận</h4>
            <button onClick={() => setIsCommentOpen(false)}>×</button>
          </div>
          <div className="comment-list">
            {post.comments?.map((c, idx) => (
              <div key={idx} className="comment-card">
                <strong>{c.fullName}</strong>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
