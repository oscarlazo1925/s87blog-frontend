import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "80vh" }}>
      <h1 className="display-3 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}
