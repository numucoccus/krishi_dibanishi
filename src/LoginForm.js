// LoginForm.js
import React from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="card p-4 shadow-sm">
      <h5 className="fw-bold text-center mb-3">লগইন করুন / <span className="text-muted">Login</span></h5>
      <p className="text-muted small text-center mb-4">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">ইমেইল / Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">পাসওয়ার্ড / Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="আপনার পাসওয়ার্ড"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">লগইন করুন / Login</button>
      </form>

      <div className="text-center mt-3">
        <p className="small mb-1">অ্যাকাউন্ট নেই?</p>
        <button className="btn btn-outline-success w-100">নতুন অ্যাকাউন্ট তৈরি করুন / Register</button>
      </div>
    </div>
  );
}
