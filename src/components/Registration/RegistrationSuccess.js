import React from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4 text-center">
        <h4 className="text-success fw-bold mb-3">
          🎉 রেজিস্ট্রেশন সফল! <br /> Registration Successful!
        </h4>
        <p className="text-muted mb-4">
          আপনার অ্যাকাউন্ট তৈরি হয়েছে। এখন লগইন করুন।
        </p>
        <button
          className="btn btn-success mx-auto d-block"
          onClick={() => navigate("/login")}
        >
          লগইন করুন / Go to Login
        </button>
      </div>
    </div>
  );
}

