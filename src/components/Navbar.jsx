import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          B-Blog
        </Link>

        {/* ✅ Burger button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Collapsible menu */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-posts">
                    My Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-comments">
                    My Comments
                  </Link>
                </li>
              </>
            )}

            {user ? (
              <li className="nav-item dropdown">
                {/* Avatar only clickable */}
                <button
                  className="btn nav-link dropdown-toggle p-0 border-0 bg-transparent"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      user.avatar ||
                      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                    }
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                    }}
                  />
                </button>

                {/* Dropdown menu */}
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  {/* ✅ Username inside dropdown */}
                  <li>
                    <h6 className="dropdown-header">{user.username}</h6>
                  </li>

                  {/* ✅ Profile Link */}
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/posts/new">
                      New Post
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
