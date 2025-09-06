import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Farmer"); // default role

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = () => {

  // 👉 Here you would normally call your backend API to save registration data

  // ✅ After success, redirect to success page
  navigate("/success");
};

  return (
    <div className="container my-4">
      <div className="text-center">
        <h5 className="text-success fw-bold">BD কৃষি দিবানিশি</h5>
        <h6 className="text-secondary">Krishi Dibanishi</h6>
        <h6 className="text-success mt-2">
          নতুন অ্যাকাউন্ট তৈরি করুন / Create New Account
        </h6>
      </div>

      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h6 className="fw-bold text-success">
            রেজিস্ট্রেশন ফর্ম / Registration Form
          </h6>
          <p className="text-muted small">
            বাংলাদেশের কৃষি, মৎস্য &amp; প্রাণিসম্পদ সম্পর্কিত যোগ দিন
          </p>

          <form>
            {/* Role Selector */}
            <div className="mb-3">
              <label className="form-label">আপনার ভূমিকা / Your Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Farmer">কৃষক / Farmer</option>
                <option value="Agricultural Expert">কৃষি বিশেষজ্ঞ / Agricultural Expert</option>
                <option value="Local Coordinator">স্থানীয় সমন্বয়কারী / Local Coordinator</option>
                <option value="Startup Innovator">স্টার্টআপ উদ্যোক্তা / Startup Innovator</option>
                <option value="Supplier">সরবরাহকারী / Supplier</option>
                <option value="Investor">বিনিয়োগকারী / Investor</option>
              </select>
            </div>

            {/* Common Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">পূর্ণ নাম / Full Name *</label>
                <input type="text" className="form-control" placeholder="আপনার পূর্ণ নাম" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">জেলা / District *</label>
                <select className="form-select">
                  <option>আপনার জেলা নির্বাচন করুন</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">ইমেইল / Email *</label>
                <input type="email" className="form-control" placeholder="your@email.com" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">উপজেলা / Upazila</label>
                <input type="text" className="form-control" placeholder="উপজেলা" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">মোবাইল নম্বর / Mobile Number *</label>
                <input type="text" className="form-control" placeholder="+880XXXXXXXXXX" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">গ্রাম/প্রকল্প / Village</label>
                <input type="text" className="form-control" placeholder="গ্রাম/প্রকল্প" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">পাসওয়ার্ড / Password *</label>
                <input type="password" className="form-control" placeholder="পাসওয়ার্ড লিখুন" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">পাসওয়ার্ড নিশ্চিত করুন / Confirm Password *</label>
                <input type="password" className="form-control" placeholder="পাসওয়ার্ড পুনরায় লিখুন" />
              </div>
            </div>

            {/* Conditional Fields by Role */}
            {role === "Farmer" && (
              <>
                <div className="mb-3">
                  <label className="form-label">চাষাবাদের ধরন / Farming Types</label>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">ফসল চাষ / Crop Farming</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">গবাদিপশু পালন / Cattle Farming</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">মাছ চাষ / Fish Farming</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">মুরগী/পোল্ট্রি পালন / Poultry Farming</label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">খামার/জমির পরিমাণ / Farm Size</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="যেমন: ২ একর / 2 acres / ১ বিঘা / 1 bigha"
                  />
                </div>
              </>
            )}

            {role === "Agricultural Expert" && (
              <>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">প্রতিষ্ঠান / Organization</label>
                    <input type="text" className="form-control" placeholder="আপনার প্রতিষ্ঠান" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">বিশেষজ্ঞ / Expertise</label>
                    <input type="text" className="form-control" placeholder="আপনার বিশেষজ্ঞতার ক্ষেত্র" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">অভিজ্ঞতা / Experience</label>
                  <input type="text" className="form-control" placeholder="যেমন: ৫ বছর কৃষি গবেষণায়" />
                </div>
              </>
            )}

            {role === "Local Coordinator" && (
              <>
                <div className="mb-3">
                  <label className="form-label">সংগঠন / Organization</label>
                  <input type="text" className="form-control" placeholder="আপনার সংগঠন" />
                </div>
                <div className="mb-3">
                  <label className="form-label">দায়িত্ব এলাকা / Area of Responsibility</label>
                  <input type="text" className="form-control" placeholder="যেমন: উপজেলা / জেলা" />
                </div>
              </>
            )}

            {role === "Startup Innovator" && (
              <>
                <div className="mb-3">
                  <label className="form-label">স্টার্টআপ নাম / Startup Name</label>
                  <input type="text" className="form-control" placeholder="আপনার স্টার্টআপ নাম" />
                </div>
                <div className="mb-3">
                  <label className="form-label">আইডিয়া/ইনোভেশন / Idea or Innovation</label>
                  <textarea className="form-control" placeholder="আপনার ইনোভেশন লিখুন"></textarea>
                </div>
              </>
            )}

            {role === "Supplier" && (
              <>
                <div className="mb-3">
                  <label className="form-label">সরবরাহ পণ্য / Supply Products</label>
                  <input type="text" className="form-control" placeholder="যেমন: সার, বীজ, যন্ত্রপাতি" />
                </div>
                <div className="mb-3">
                  <label className="form-label">কোম্পানি নাম / Company Name</label>
                  <input type="text" className="form-control" placeholder="আপনার কোম্পানির নাম" />
                </div>
              </>
            )}

            {role === "Investor" && (
              <>
                <div className="mb-3">
                  <label className="form-label">বিনিয়োগের খাত / Investment Sector</label>
                  <input type="text" className="form-control" placeholder="যেমন: কৃষি, মৎস্য, প্রাণিসম্পদ" />
                </div>
                <div className="mb-3">
                  <label className="form-label">বিনিয়োগ পরিমাণ / Investment Amount</label>
                  <input type="text" className="form-control" placeholder="যেমন: ১০ লক্ষ টাকা" />
                </div>
              </>
            )}

            {/* Terms */}
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                আমি <a href="#">শর্তাবলী</a> এবং <a href="#">গোপনীয়তা নীতি</a> মেনে নিচ্ছি / I agree to the{" "}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </label>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2">
              <button type="submit" 
                      className="btn btn-success"
                      onClick={handleSubmit}
              >
                অ্যাকাউন্ট তৈরি করুন / Create Account
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleLoginRedirect}
              >
                ইতিমধ্যেই অ্যাকাউন্ট আছে? লগিন করুন / Already have account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
