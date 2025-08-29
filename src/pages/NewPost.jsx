import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function NewPost(){
  const [form, setForm] = useState({ title:'', content:'' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await API.post('/posts', form);
      navigate(`/posts/${res.data._id}`);
    }catch(err){
      alert(err.response?.data?.message || 'Failed');
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="col-md-8 offset-md-2">
      <h3>New Post</h3>
      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={e=>setForm({...form,title:e.target.value})}
          disabled={loading}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Content"
          value={form.content}
          onChange={e=>setForm({...form,content:e.target.value})}
          rows={8}
          disabled={loading}
        />
        <button className="btn btn-sm btn-outline-primary" type="submit" disabled={loading || !form.title || !form.content}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Publishing...
            </>
          ) : "Publish"}
        </button>
      </form>
    </div>
  )
}
