import React, { useState, useContext } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginBtnTxt, setLoginBtnTxt] = useState("Login");
  const { login } = useContext(AuthContext); // ✅ use context

  const handle = async (e) => {
    setLoginBtnTxt("logging in..");
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      // ✅ Call AuthContext login instead of manual localStorage
      login(res.data.user, res.data.token);
      setTimeout(() => {
        navigate("/"); // redirect
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed");
    } finally {
      setTimeout(() => {
        setLoginBtnTxt("Login");
      }, 1500);
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h3>Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handle}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="btn btn-sm btn-outline-primary"
          disabled={
            loginBtnTxt === "logging in.." || !form.email || !form.password
          }
        >
          {loginBtnTxt}
        </button>
      </form>

      <p className="mt-3">oreg@mail.com - 123456789</p>
      <p className="mt-3">oreg2@mail.com - 123456789</p>
      <p className="mt-3">adminuser@mail.com - 123456789</p>

    </div>
  );
}
