// src/components/RegistrationForm.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const districts = [ /* same list you already have - keep it here */ 
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", "Brahmanbaria",
    "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Dhaka", "Dinajpur",
    "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur",
    "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Kishoreganj", "Kurigram",
    "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj",
    "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail",
    "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh",
    "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira",
    "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon",
    "Joydebpur", "Madaripur", "Shariatpur", "Netrokona", "Khulna", "Faridganj", "Comilla"
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: "Farmer",
    name: "",
    district: "",
    upazila: "",
    village: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    farmingTypes: [],
    farmSize: "",
    organization: "",
    expertise: "",
    experience: "",
    areaOfResponsibility: "",
    startupName: "",
    idea: "",
    supplyProducts: "",
    companyName: "",
    investmentSector: "",
    investmentAmount: "",
    agreedToTerms: false
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginRedirect = () => navigate("/login");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "agreedToTerms") {
      setForm(prev => ({ ...prev, agreedToTerms: checked }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // farming type checkboxes (array)
  const toggleFarmingType = (typeName) => {
    setForm(prev => {
      const arr = prev.farmingTypes.includes(typeName)
        ? prev.farmingTypes.filter(x => x !== typeName)
        : [...prev.farmingTypes, typeName];
      return { ...prev, farmingTypes: arr };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    // client-side validation
    if (!form.name || !form.email || !form.password) {
      setMsg("Name, email and password are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }
    if (!form.agreedToTerms) {
      setMsg("Please accept terms and privacy policy.");
      return;
    }

    setLoading(true);
    try {
      // send full form (backend schema accepts extra fields)
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: form.role,
          name: form.name,
          district: form.district,
          upazila: form.upazila,
          village: form.village,
          email: form.email,
          mobile: form.mobile,
          password: form.password,
          farmingTypes: form.farmingTypes,
          farmSize: form.farmSize,
          organization: form.organization,
          expertise: form.expertise,
          experience: form.experience,
          areaOfResponsibility: form.areaOfResponsibility,
          startupName: form.startupName,
          idea: form.idea,
          supplyProducts: form.supplyProducts,
          companyName: form.companyName,
          investmentSector: form.investmentSector,
          investmentAmount: form.investmentAmount,
          agreedToTerms: form.agreedToTerms
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || "Registration failed");
        setLoading(false);
        return;
      }
      // success
      setLoading(false);
      navigate("/success");
    } catch (err) {
      console.error(err);
      setMsg("Network error. Is the backend running?");
      setLoading(false);
    }
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
          <h6 className="fw-bold text-success">রেজিস্ট্রেশন ফর্ম / Registration Form</h6>
          <p className="text-muted small">বাংলাদেশের কৃষি, মৎস্য &amp; প্রাণিসম্পদ সম্পর্কিত যোগ দিন</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">আপনার ভূমিকা / Your Role</label>
              <select
                className="form-select"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="Farmer">কৃষক / Farmer</option>
                <option value="Agricultural Expert">কৃষি বিশেষজ্ঞ / Agricultural Expert</option>
                <option value="Local Coordinator">স্থানীয় সমন্বয়কারী / Local Coordinator</option>
                <option value="Startup Innovator">স্টার্টআপ উদ্যোক্তা / Startup Innovator</option>
                <option value="Supplier">সরবরাহকারী / Supplier</option>
                <option value="Investor">বিনিয়োগকারী / Investor</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">পূর্ণ নাম / Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} type="text" className="form-control" placeholder="আপনার পূর্ণ নাম" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">জেলা / District *</label>
                <select name="district" className="form-select" value={form.district} onChange={handleChange}>
                  <option value="">আপনার জেলা নির্বাচন করুন</option>
                  {districts.map((d, i) => (<option key={i} value={d}>{d}</option>))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">ইমেইল / Email *</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" placeholder="your@email.com" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">উপজেলা / Upazila</label>
                <input name="upazila" value={form.upazila} onChange={handleChange} type="text" className="form-control" placeholder="উপজেলা" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">মোবাইল নম্বর / Mobile Number *</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} type="text" className="form-control" placeholder="+880XXXXXXXXXX" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">গ্রাম/প্রকল্প / Village</label>
                <input name="village" value={form.village} onChange={handleChange} type="text" className="form-control" placeholder="গ্রাম/প্রকল্প" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">পাসওয়ার্ড / Password *</label>
                <input name="password" value={form.password} onChange={handleChange} type="password" className="form-control" placeholder="পাসওয়ার্ড লিখুন" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">পাসওয়ার্ড নিশ্চিত করুন / Confirm Password *</label>
                <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" className="form-control" placeholder="পাসওয়ার্ড পুনরায় লিখুন" />
              </div>
            </div>

            {/* conditional Farmer fields */}
            {form.role === "Farmer" && (
              <>
                <div className="mb-3">
                  <label className="form-label">চাষাবাদের ধরন / Farming Types</label>
                  {["Crop Farming", "Cattle Farming", "Fish Farming", "Poultry Farming"].map((ft) => (
                    <div className="form-check" key={ft}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={ft}
                        checked={form.farmingTypes.includes(ft)}
                        onChange={() => toggleFarmingType(ft)}
                      />
                      <label className="form-check-label" htmlFor={ft}>
                        {ft === "Crop Farming" ? "ফসল চাষ / Crop Farming" :
                         ft === "Cattle Farming" ? "গবাদিপশু পালন / Cattle Farming" :
                         ft === "Fish Farming" ? "মাছ চাষ / Fish Farming" :
                         "মুরগী/পোল্ট্রি পালন / Poultry Farming"}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <label className="form-label">খামার/জমির পরিমাণ / Farm Size</label>
                  <input name="farmSize" value={form.farmSize} onChange={handleChange} type="text" className="form-control" placeholder="যেমন: ২ একর / 2 acres / ১ বিঘা / 1 bigha" />
                </div>
              </>
            )}

            {/* Keep your other conditional role fields but bind them to state similarly */}
            {form.role === "Agricultural Expert" && (
              <>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">প্রতিষ্ঠান / Organization</label>
                    <input name="organization" value={form.organization} onChange={handleChange} type="text" className="form-control" placeholder="আপনার প্রতিষ্ঠান" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">বিশেষজ্ঞ / Expertise</label>
                    <input name="expertise" value={form.expertise} onChange={handleChange} type="text" className="form-control" placeholder="আপনার বিশেষজ্ঞতার ক্ষেত্র" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">অভিজ্ঞতা / Experience</label>
                  <input name="experience" value={form.experience} onChange={handleChange} type="text" className="form-control" placeholder="যেমন: ৫ বছর কৃষি গবেষণায়" />
                </div>
              </>
            )}

            {form.role === "Local Coordinator" && (
              <>
                <div className="mb-3">
                  <label className="form-label">সংগঠন / Organization</label>
                  <input name="organization" value={form.organization} onChange={handleChange} type="text" className="form-control" placeholder="আপনার সংগঠন" />
                </div>
                <div className="mb-3">
                  <label className="form-label">দায়িত্ব এলাকা / Area of Responsibility</label>
                  <input name="areaOfResponsibility" value={form.areaOfResponsibility} onChange={handleChange} type="text" className="form-control" placeholder="যেমন: উপজেলা / জেলা" />
                </div>
              </>
            )}

            {form.role === "Startup Innovator" && (
              <>
                <div className="mb-3">
                  <label className="form-label">স্টার্টআপ নাম / Startup Name</label>
                  <input name="startupName" value={form.startupName} onChange={handleChange} type="text" className="form-control" placeholder="আপনার স্টার্টআপ নাম" />
                </div>
                <div className="mb-3">
                  <label className="form-label">আইডিয়া/ইনোভেশন / Idea or Innovation</label>
                  <textarea name="idea" value={form.idea} onChange={handleChange} className="form-control" placeholder="আপনার ইনোভেশন লিখুন"></textarea>
                </div>
              </>
            )}

            {form.role === "Supplier" && (
              <>
                <div className="mb-3">
                  <label className="form-label">সরবরাহ পণ্য / Supply Products</label>
                  <input name="supplyProducts" value={form.supplyProducts} onChange={handleChange} type="text" className="form-control" placeholder="যেমন: সার, বীজ, যন্ত্রপাতি" />
                </div>
                <div className="mb-3">
                  <label className="form-label">কোম্পানি নাম / Company Name</label>
                  <input name="companyName" value={form.companyName} onChange={handleChange} type="text" className="form-control" placeholder="আপনার কোম্পানির নাম" />
                </div>
              </>
            )}

            {form.role === "Investor" && (
              <>
                <div className="mb-3">
                  <label className="form-label">বিনিয়োগের খাত / Investment Sector</label>
                  <input name="investmentSector" value={form.investmentSector} onChange={handleChange} type="text" className="form-control" placeholder="যেমন: কৃষি, মৎস্য, প্রাণিসম্পদ" />
                </div>
                <div className="mb-3">
                  <label className="form-label">বিনিয়োগ পরিমাণ / Investment Amount</label>
                  <input name="investmentAmount" value={form.investmentAmount} onChange={handleChange} type="text" className="form-control" placeholder="যেমন: ১০ লক্ষ টাকা" />
                </div>
              </>
            )}

            <div className="form-check mb-3">
              <input name="agreedToTerms" className="form-check-input" type="checkbox" checked={form.agreedToTerms} onChange={handleChange} />
              <label className="form-check-label">
                আমি <a href="#">শর্তাবলী</a> এবং <a href="#">গোপনীয়তা নীতি</a> মেনে নিচ্ছি / I agree to the Terms and Privacy Policy.
              </label>
            </div>

            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Submitting..." : "অ্যাকাউন্ট তৈরি করুন / Create Account"}
              </button>
              <button type="button" className="btn btn-outline-success" onClick={handleLoginRedirect}>
                ইতিমধ্যেই অ্যাকাউন্ট আছে? লগিন করুন / Already have account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
