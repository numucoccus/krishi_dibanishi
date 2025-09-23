import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProfilePage() {
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Bangla labels mapping
  const fieldLabels = {
    name: "পূর্ণ নাম",
    email: "ইমেইল",
    mobile: "মোবাইল নম্বর", 
    district: "জেলা",
    upazila: "উপজেলা",
    village: "গ্রাম/প্রকল্প",
    role: "ভূমিকা"
  };

  const roleLabels = {
    Farmer: "কৃষক",
    Expert: "কৃষি বিশেষজ্ঞ",
    Coordinator: "স্থানীয় সমন্বয়কারী",
    Innovator: "স্টার্টআপ উদ্যোক্তা", 
    Supplier: "সরবরাহকারী",
    Investor: "বিনিয়োগকারী"
  };

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Profile API response:", data);

        if (res.ok) {
          setFormData(data.user);
          setOriginalData(data.user);
          setProfileImage(data.user.profileImage || null);
        } else {
          setMsg(data.message || "প্রোফাইল লোড করতে সমস্যা হয়েছে");
        }
      } catch (err) {
        console.error(err);
        setMsg("নেটওয়ার্ক সমস্যা। প্রোফাইল লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Password change handler
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  // Cancel changes
  const handleCancel = () => {
    setFormData(originalData);
    setProfileImage(originalData.profileImage || null);
    setMsg("");
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("আপডেট করা হচ্ছে...");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value ?? "");
      });

      if (profileImage && typeof profileImage !== "string") {
        form.append("profileImage", profileImage);
      }

      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        setOriginalData(formData);
      } else {
        setMsg(data.message || "আপডেট ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setMsg("কিছু সমস্যা হয়েছে।");
    }
  };

  // Change password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMsg("নতুন পাসওয়ার্ড মিলছে না");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMsg("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে");
      return;
    }

    setMsg("পাসওয়ার্ড পরিবর্তন করা হচ্ছে...");

    try {
      const res = await fetch("http://localhost:5000/api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
        setShowPasswordChange(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMsg(data.message || "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে");
      }
    } catch (err) {
      console.error(err);
      setMsg("নেটওয়ার্ক সমস্যা। পাসওয়ার্ড পরিবর্তন করা যায়নি।");
    }
  };

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) return <div className="text-center my-5">প্রোফাইল লোড হচ্ছে...</div>;
  if (!formData) return <div className="text-center my-5 text-danger">প্রোফাইল ডেটা পাওয়া যায়নি।</div>;

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button className="btn btn-outline-secondary mb-3" onClick={handleBack}>
        ← পিছনে যান
      </button>

      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">👤 প্রোফাইল ব্যবস্থাপনা</h4>
        </div>
        
        <div className="card-body">
          {/* Profile Picture Section */}
          <div className="text-center mb-4 border-bottom pb-4">
            <img
              src={
                typeof profileImage === "string"
                  ? `http://localhost:5000/uploads/${profileImage}`
                  : profileImage
                  ? URL.createObjectURL(profileImage)
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="img-thumbnail mb-3 shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
            />
            <div className="w-50 mx-auto">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
              <small className="text-muted">প্রোফাইল ছবি পরিবর্তন করুন</small>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="mb-4">
            <button 
              className={`btn ${showPasswordChange ? 'btn-warning' : 'btn-outline-warning'} w-100`}
              onClick={() => setShowPasswordChange(!showPasswordChange)}
            >
              {showPasswordChange ? 'পাসওয়ার্ড পরিবর্তন বাতিল করুন' : 'পাসওয়ার্ড পরিবর্তন করুন'}
            </button>
          </div>

          {showPasswordChange && (
            <div className="card border-warning mb-4">
              <div className="card-header bg-warning">
                <h6 className="mb-0">পাসওয়ার্ড পরিবর্তন</h6>
              </div>
              <div className="card-body">
                <form onSubmit={handlePasswordUpdate}>
                  <div className="mb-3">
                    <label className="form-label">বর্তমান পাসওয়ার্ড</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">নতুন পাসওয়ার্ড</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-warning">
                    পাসওয়ার্ড পরিবর্তন করুন
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Profile Information Section */}
          <div className="card border-success">
            <div className="card-header bg-light">
              <h6 className="mb-0">ব্যক্তিগত তথ্য</h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="row">
                  {["name", "email", "mobile", "district", "upazila", "village"].map((field) => (
                    <div className="col-md-6 mb-3" key={field}>
                      <label className="form-label fw-bold">{fieldLabels[field]}</label>
                      <input
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleInputChange}
                        className="form-control"
                        disabled={field === 'email'} // Email shouldn't be changed
                      />
                    </div>
                  ))}
                  
                  {/* Role Display (Read-only) */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">ভূমিকা</label>
                    <input
                      value={roleLabels[formData.role] || formData.role}
                      className="form-control"
                      readOnly
                      style={{backgroundColor: '#f8f9fa'}}
                    />
                  </div>
                </div>

                {msg && (
                  <div className={`alert ${msg.includes('সফল') ? 'alert-success' : 'alert-info'} mt-3`}>
                    {msg}
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-success px-4">
                    পরিবর্তনগুলি সংরক্ষণ করুন
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    বাতিল করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}