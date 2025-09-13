import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));
      setLoading(false);

      if (response.ok && data.success) {
        // Store user info instead of token
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home"); // ✅ Make sure this route exists
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="card p-4 shadow-sm h-100">
      <h5 className="fw-bold text-center mb-3">
        লগইন করুন / <span className="text-muted">Login</span>
      </h5>
      <p className="text-muted small text-center mb-4">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

      {error && <p className="text-danger text-center">{error}</p>}
      {loading && <p className="text-center text-primary">Logging in...</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">ইমেইল / Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="আপনার পাসওয়ার্ড"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
          লগইন করুন / Login
        </button>

        <div className="text-center">
          <p className="small mb-2">অ্যাকাউন্ট নেই?</p>
          <button 
            type="button" 
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/register")}
          >
            রেজিস্টার করুন / Register
          </button>
        </div>
      </form>
    </div>
  );
}
