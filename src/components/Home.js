import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role); // e.g. "farmer", "supplier", "expert"
    }
  }, []);

  // Mapping English role → Bangla text
  const roleTranslations = {
    farmer: "কৃষক",
    expert: "কৃষি বিশেষজ্ঞ",
    coordinator: "স্থানীয় সমন্বয়কারী",
    innovator: "স্টার্টআপ উদ্যোক্তা",
    supplier: "সরবরাহকারী",
    investor: "বিনিয়োগকারী",
  };

  // If role not found, default to "প্রোফাইল"
  const profileName = roleTranslations[userRole?.toLowerCase()] || "প্রোফাইল";

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/home">
            BD <span className="text-dark">কৃষি দিবানিশি</span>
          </Link>
      
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/home">হোম</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">ড্যাশবোর্ড</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/community">কমিউনিটি</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/resources">রিসোর্স</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/market">বাজার</Link></li>
            </ul>
      
            <div className="d-flex">
              {/* Dynamic Profile Button */}
              <Link to="/profile" className="btn btn-success me-2">
                {profileName}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="text-center py-5" style={{ backgroundColor: '#e9f7ef' }}>
        <div className="container">
          <h2 className="fw-bold text-success">BD কৃষি দিবানিশি</h2>
          <h4 className="mt-3">বাংলাদেশের সমন্বিত কৃষি, মৎস্য ও প্রাণিসম্পদ প্ল্যাটফর্ম</h4>
          <p className="mt-3 mb-4 text-muted">
            Krishi Dibanishi - Bangladesh's Integrated Agriculture, Fisheries & Livestock Platform<br />
            বাংলাদেশের কৃষক, মৎস্যজীবী ও খামারিদের জন্য আধুনিক ডিজিটাল সমাধান। বিশেষজ্ঞ পরামর্শ, প্রযুক্তিগত সহায়তা এবং একটি প্রাণবন্ত কমিউনিটি।
          </p>
          
          {/* Stats Section */}
          <div className="row mt-5 justify-content-center">
            <div className="col-md-10">
              <div className="bg-white p-4 rounded shadow text-center">
                <h5 className="fw-bold text-success mb-4">সারা বাংলাদেশে সেবা</h5>
                <p className="text-muted">টাঙ্গুয়ার পাহাড় থেকে সুন্দরবনের উপকূল - সারা দেশের কৃষি সম্প্রদায়ের সেবায়</p>

                <div className="row mt-4">
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">২৫,৮০০+</h4>
                    <p className="text-muted">নিবন্ধিত সদস্য<br /><small>Registered Members</small></p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">১২,৬০০+</h4>
                    <p className="text-muted">সক্রিয় খামার<br /><small>Active Farms</small></p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">৮,৪০০+</h4>
                    <p className="text-muted">বিশেষজ্ঞ পরামর্শ<br /><small>Expert Consultants</small></p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">৩,৮০০+</h4>
                    <p className="text-muted">সফল প্রকল্প<br /><small>Successful Projects</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">আমাদের সেবা ক্ষেত্র</h3>
            <p className="text-muted mb-4">Our Service Areas</p>
            <div className="row g-4 justify-content-center">
              {/* Card 1 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🌾</div>
                  <h5 className="fw-bold">ফসল চাষ</h5>
                  <p className="text-muted">Crop Farming</p>
                  <small>ধান, গম, সবজি, ফল ও অন্যান্য ফসল</small>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🐟</div>
                  <h5 className="fw-bold">মাছ চাষ</h5>
                  <p className="text-muted">Fish Farming</p>
                  <small>দেশি-বিদেশি মাছ ও চিংড়ি চাষ</small>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🐄</div>
                  <h5 className="fw-bold">গবাদিপশু পালন</h5>
                  <p className="text-muted">Cattle Farming</p>
                  <small>গরু, মহিষ, ছাগল ও ভেড়া পালন</small>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🐓</div>
                  <h5 className="fw-bold">মুরগি পালন</h5>
                  <p className="text-muted">Poultry Farming</p>
                  <small>মুরগি, হাঁস ও অন্যান্য পাখি পালন</small>
                </div>
              </div>
            </div>
          </div>

          {/* Community Partners Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">আমাদের কমিউনিটি অংশীদার</h3>
            <p className="text-muted mb-4">Our Community Partners</p>
            {/* Cards for Experts, Coordinators, Innovators, Suppliers, Investors */}
          </div>

          {/* Knowledge & Resource Exchange Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">জ্ঞান, প্রযুক্তি ও সহায়তার আদান-প্রদান</h3>
            <p className="text-muted mb-4">Exchange Knowledge, Technology & Support</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
