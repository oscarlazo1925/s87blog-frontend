import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function MyComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/comments/mine");
        setComments(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-8 offset-md-2">
      <h2>My Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="mb-3 p-2 border rounded">
            <p className="mb-1">{c.content}</p>
            <small className="text-muted">
              Posted on:{" "}
              {c.post ? (
                <Link
                  to={`/posts/${c.post._id}`}
                  className="badge bg-secondary text-decoration-none px-3 py-1"
                >
                  {c.post.title.toUpperCase()}
                </Link>
              ) : (
                <span className="text-danger">[Post Deleted]</span>
              )}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
