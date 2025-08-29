import React, { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'

export default function Posts(){
  const [posts, setPosts] = useState([]);
  useEffect(()=>{ fetchPosts(); },[]);
  const fetchPosts = async ()=>{
    const res = await API.get('/posts');
    console.log(res.data)
    setPosts(res.data);
  }
  return (
    <div className='col-md-8 offset-md-2'>
      <h2>Posts</h2>
      {posts.map(p => (
        <div key={p._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{p.title}</h5>
            <p className="card-text">By {p.author?.username} • {new Date(p.createdAt).toLocaleString()}</p>
            <Link to={`/posts/${p._id}`} className="btn btn-sm btn-outline-primary">Read</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
