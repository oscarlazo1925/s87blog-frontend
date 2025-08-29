import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function PostView() {
  const { id } = useParams();
  const [data, setData] = useState({ post: null, comments: [] });
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [deletingComment, setDeletingComment] = useState(null);

  const [showPostModal, setShowPostModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch();
  }, [id]);

  const fetch = async () => {
    const res = await API.get(`/posts/${id}`);
    setData(res.data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post(`/comments/${id}`, { content: text });
      setText("");
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeletePost = async () => {
    try {
      setDeletingPost(true);
      await API.delete(`/posts/${id}`);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setDeletingPost(false);
      setShowPostModal(false);
    }
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return;
    try {
      setDeletingComment(commentToDelete);
      await API.delete(`/comments/${commentToDelete}`);
      setTimeout(() => {
        fetch();
      }, 1000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setDeletingComment(null);
      setCommentToDelete(null);
    }
  };

  return (
    <div className="col-md-8 offset-md-2">
      {!data.post ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2>{data.post.title}</h2>
          <p>
            By {data.post.author?.username} •{" "}
            {new Date(data.post.createdAt).toLocaleString()}
          </p>
          <div className="mb-3">{data.post.content}</div>

          {user &&
            (user.id === data.post.author?._id || user.role === "admin") && (
              <>
                <Link
                  to={`/posts/${id}/edit`}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setShowPostModal(true)}
                >
                  Delete
                </button>
              </>
            )}

          <hr />
          <h5>Comments</h5>
          {data.comments.map((c) => (
            <div key={c._id} className="mb-2 ps-2 fs-6">
              <strong>{c.author?.username}</strong> •{" "}
              {new Date(c.createdAt).toLocaleString()}
              <p className="ms-5">
                {c.content}
                {user &&
                  (user.id === c.author?._id || user.role === "admin") && (
                    <>
                      <i
                        className="bi bi-x-circle text-danger ms-2"
                        style={{ cursor: "pointer", fontSize: "1.2rem" }}
                        title="Delete comment"
                        onClick={() => setCommentToDelete(c._id)}
                      ></i>
                    </>
                  )}
              </p>
            </div>
          ))}

          {user ? (
            <form onSubmit={addComment} className="mt-3">
              <textarea
                className="form-control mb-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
              />
              <button
                className="btn btn-sm btn-outline-primary"
                disabled={loading || !text}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Posting...
                  </>
                ) : (
                  "Add Comment"
                )}
              </button>
            </form>
          ) : (
            <Link to="/login" className="btn btn-sm btn-outline-info mt-3">
              Please login to comment
            </Link>
          )}
        </>
      )}

      {/* Post Delete Modal */}
      {showPostModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Post</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPostModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this post?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowPostModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={confirmDeletePost}
                  disabled={deletingPost}
                >
                  {deletingPost ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Delete Modal */}
      {commentToDelete && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Comment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCommentToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this comment?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setCommentToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={confirmDeleteComment}
                  disabled={deletingComment === commentToDelete}
                >
                  {deletingComment === commentToDelete ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
