// src/pages/Profile.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h3>You must be logged in to view your profile.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <img
            src={
              user.avatar ||
              "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
            }
            alt="avatar"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <h4>{user.username}</h4>
          <p className="text-muted">{user.email}</p>
          <p className="text-muted">{user.role}</p>
        </div>
      </div>
    </div>
  );
}
