import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import PostView from "./pages/PostView";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";
import MyComments from "./pages/MyComments";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Posts />} />
          <Route path="/my-comments" element={<MyComments />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
