import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    }catch(err){ setError(err.response?.data?.message || 'Failed'); }
  }
  return (
    <div className="col-md-6 offset-md-3">
      <h3>Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handle}>
        <input className="form-control mb-2" placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} />
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="form-control mb-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button
        className="btn btn-sm btn-outline-primary"
        disabled = {!form.username || !form.password || !form.email}
        >Register</button>
      </form>
    </div>
  )
}
