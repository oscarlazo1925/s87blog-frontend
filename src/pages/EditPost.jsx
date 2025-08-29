import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true); // page load spinner
  const [saving, setSaving] = useState(false); // submit spinner
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setForm({ title: res.data.post.title, content: res.data.post.content });
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put(`/posts/${id}`, form);
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 1500);
    }
  };

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
      <h3>Edit Post</h3>
      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          disabled={saving}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={8}
          disabled={saving}
        />
        <button className="btn btn-sm btn-outline-danger" type="submit" disabled={saving || !form.content || !form.title}>
          {saving ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
}
