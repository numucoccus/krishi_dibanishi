import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const RegistrationForm = () => {
    const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); // navigate to LoginForm
  };

  return (
    <div className="container my-4">
      <div className="text-center">
        <h5 className="text-success fw-bold">BD কৃষি দিবানিশি</h5>
        <h6 className="text-secondary">Krishi Dibanishi</h6>
        <h6 className="text-success mt-2">নতুন অ্যাকাউন্ট তৈরি করুন / Create New Account</h6>
      </div>

      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h6 className="fw-bold text-success">
            রেজিস্ট্রেশন ফর্ম / Registration Form
          </h6>
          <p className="text-muted small">
            বাংলাদেশের কৃষি, মৎস্য &amp; প্রানিসম্পদ সম্পর্কিত যোগ দিন
          </p>

          <form>
            {/* Role */}
            <div className="mb-3">
              <label className="form-label">আপনার ভূমিকা / Your Role</label>
              <select className="form-select">
                <option>কৃষক / Farmer</option>
              </select>
            </div>

            <div className="row">
              {/* Full Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">পূর্ণ নাম / Full Name *</label>
                <input type="text" className="form-control" placeholder="আপনার পূর্ণ নাম" />
              </div>

              {/* District */}
              <div className="col-md-6 mb-3">
                <label className="form-label">জেলা / District *</label>
                <select className="form-select">
                  <option>আপনার জেলা নির্বাচন করুন</option>
                </select>
              </div>
            </div>

            <div className="row">
              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">ইমেইল / Email *</label>
                <input type="email" className="form-control" placeholder="your@email.com" />
              </div>

              {/* Upazila */}
              <div className="col-md-6 mb-3">
                <label className="form-label">উপজেলা / Upazila</label>
                <input type="text" className="form-control" placeholder="উপজেলা" />
              </div>
            </div>

            <div className="row">
              {/* Mobile */}
              <div className="col-md-6 mb-3">
                <label className="form-label">মোবাইল নম্বর / Mobile Number *</label>
                <input type="text" className="form-control" placeholder="+880XXXXXXXXXX" />
              </div>

              {/* Village */}
              <div className="col-md-6 mb-3">
                <label className="form-label">গ্রাম/প্রকল্প / Village</label>
                <input type="text" className="form-control" placeholder="গ্রাম/প্রকল্প" />
              </div>
            </div>

            <div className="row">
              {/* Password */}
              <div className="col-md-6 mb-3">
                <label className="form-label">পাসওয়ার্ড / Password *</label>
                <input type="password" className="form-control" placeholder="পাসওয়ার্ড লিখুন" />
              </div>

              {/* Farming Types */}
              <div className="col-md-6 mb-3">
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
            </div>

            <div className="row">
              {/* Confirm Password */}
              <div className="col-md-6 mb-3">
                <label className="form-label">পাসওয়ার্ড নিশ্চিত করুন / Confirm Password *</label>
                <input type="password" className="form-control" placeholder="পাসওয়ার্ড পুনরায় লিখুন" />
              </div>

              {/* Farm Size */}
              <div className="col-md-6 mb-3">
                <label className="form-label">খামার/জমির পরিমাণ / Farm Size</label>
                <input type="text" className="form-control" placeholder="যেমন: ২ একর / 2 acres / ১ বিঘা / 1 bigha" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">অভিজ্ঞতা / Experience</label>
              <input type="text" className="form-control" placeholder="যেমন: ২ বছর কৃষিকাজে" />
            </div>

            {/* Terms */}
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                আমি <a href="#">শর্তাবলী</a> এবং <a href="#">গোপনীয়তা নীতি</a> মেনে নিচ্ছি / I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit */}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success">
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
};

export default RegistrationForm;