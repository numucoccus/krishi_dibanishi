import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProfilePage() {
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const token = localStorage.getItem("token"); // JWT token

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
          setMsg(data.message || "Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        setMsg("Network error. Could not load profile.");
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
  };

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("Updating...");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value ?? "");
      });

      if (profileImage && typeof profileImage !== "string") {
        form.append("profileImage", profileImage);
      }

      // Debug log
      for (let pair of form.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Do not set Content-Type
        },
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("Profile updated successfully!");
        setOriginalData(formData); // Update original
      } else {
        setMsg(data.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      setMsg("Something went wrong.");
    }
  };

  if (loading) return <div className="text-center my-5">Loading profile...</div>;
  if (!formData) return <div className="text-center my-5 text-danger">No profile data found.</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="mb-3">👤 My Profile</h4>

          {/* Profile Picture */}
          <div className="mb-3 text-center">
            <img
              src={
                typeof profileImage === "string"
                  ? `http://localhost:5000/uploads/${profileImage}`
                  : profileImage
                  ? URL.createObjectURL(profileImage)
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="img-thumbnail mb-2"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                className="form-control mt-2"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleUpdate}>
            {["name", "email", "mobile", "district", "upazila", "village"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            ))}

            {msg && <div className="alert alert-info">{msg}</div>}

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

