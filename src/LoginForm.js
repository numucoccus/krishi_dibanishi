import React from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="card p-4 shadow-sm h-100">
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

        <button type="submit" className="btn btn-success w-100 mb-3">লগইন করুন / Login</button>
        
        <div className="text-center">
          <p className="small mb-2">অ্যাকাউন্ট নেই?</p>
          <button 
            type="button" 
            className="btn btn-outline-primary w-100"
            onClick={handleRegister}
          >
            রেজিস্টার করুন / Register
          </button>
        </div>
      </form>
    </div>
  );
}