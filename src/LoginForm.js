import React, { useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login response:", data); // 👈 see if token is inside

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      console.log("Saved token:", localStorage.getItem("token")); // 👈 confirm saved
      navigate("/home");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};

  const handleRegister = () => {
    navigate("/register");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
