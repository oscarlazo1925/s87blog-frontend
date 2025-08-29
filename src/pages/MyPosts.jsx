// src/pages/MyPosts.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await API.get("/posts/mine"); // 🔥 new endpoint
        setPosts(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!user) return <p>Please login to view your posts.</p>;
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
      <h2>My Posts</h2>
      <hr />
      {posts.length === 0 ? (
        <p>You haven't posted anything yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-3">
            <h4>
              <Link to={`/posts/${post._id}`} className="no-underline-link">{post.title}</Link>
            </h4>
            <p className="text-muted">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p>{post.content.substring(0, 120)}...</p>
            <Link
              to={`/posts/${post._id}/edit`}
              className="btn btn-sm btn-outline-secondary me-2"
            >
              Edit
            </Link>
            <Link
              to={`/posts/${post._id}`}
              className="btn btn-sm btn-outline-primary"
            >
              View
            </Link>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
