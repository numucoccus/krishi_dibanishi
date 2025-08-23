import React from "react";
import './App.css';

export default function LoginForm() {
  return (
    <div className="card card-custom p-4">
      <h4 className="fw-bold mb-3 text-center">Login</h4>

      <form>
        {/* Email input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
          />
        </div>

        {/* Password input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        {/* Login button */}
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}
