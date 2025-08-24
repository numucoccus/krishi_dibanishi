import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-success" href="/home">BD <span className="text-dark">কৃষি দিবানিশি</span></a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
  <li className="nav-item"><a className="nav-link" href="/home">হোম</a></li>
  <li className="nav-item"><a className="nav-link" href="/dashboard">ড্যাশবোর্ড</a></li>
  <li className="nav-item"><a className="nav-link" href="/community">কমিউনিটি</a></li>
  <li className="nav-item"><a className="nav-link" href="/resources">রিসোর্স</a></li>
  <li className="nav-item"><a className="nav-link" href="/market">বাজার</a></li>
</ul>

            <div className="d-flex">
              <button className="btn btn-success me-2">কৃষক</button>
              <button className="btn btn-outline-danger">লগইন/রেজিস্টার</button>
            </div>
          </div>
        </div>
      </nav>
      

      

      <section className="text-center py-5" style={{ backgroundColor: '#e9f7ef' }}>
        <div className="container">
          <h2 className="fw-bold text-success">BD কৃষি দিবানিশি</h2>
          <h4 className="mt-3">বাংলাদেশের সমন্বিত কৃষি, মৎস্য ও প্রাণিসম্পদ প্ল্যাটফর্ম</h4>
          <p className="mt-3 mb-4 text-muted">
            Krishi Dibanishi - Bangladesh's Integrated Agriculture, Fisheries & Livestock Platform<br />
            বাংলাদেশের কৃষক, মৎস্যজীবী ও খামারিদের জন্য আধুনিক ডিজিটাল সমাধান। বিশেষজ্ঞ পরামর্শ, প্রযুক্তিগত সহায়তা এবং একটি প্রাণবন্ত কমিউনিটি।
          </p>
           <a href="/join" className="btn btn-success btn-lg">আজই যোগ দিন / Join Today</a>
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
        <div className="mt-2">
          <span className="badge bg-light text-muted me-1">ধান ,</span>
          <span className="badge bg-light text-muted me-1">গম ,</span>
          <span className="badge bg-light text-muted me-1">আলু ,</span>
          <span className="badge bg-light text-muted me-1">টমেটো ,</span>
          <span className="badge bg-light text-muted">আম</span>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-md-3">
      <div className="card p-3 h-100 shadow-sm">
        <div className="fs-1 mb-2">🐟</div>
        <h5 className="fw-bold">মাছ চাষ</h5>
        <p className="text-muted">Fish Farming</p>
        <small>দেশি-বিদেশি মাছ ও চিংড়ি চাষ</small>
        <div className="mt-2">
          <span className="badge bg-light text-muted me-1">রুই ,</span>
          <span className="badge bg-light text-muted me-1">কাতলা ,</span>
          <span className="badge bg-light text-muted me-1">তেলাপিয়া ,</span>
          <span className="badge bg-light text-muted me-1">পাঙ্গাস ,</span>
          <span className="badge bg-light text-muted">চিংড়ি</span>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-md-3">
      <div className="card p-3 h-100 shadow-sm">
        <div className="fs-1 mb-2">🐄</div>
        <h5 className="fw-bold">গবাদিপশু পালন</h5>
        <p className="text-muted">Cattle Farming</p>
        <small>গরু, মহিষ, ছাগল ও ভেড়া পালন</small>
        <div className="mt-2">
          <span className="badge bg-light text-muted me-1">দেশি গাভী ,</span>
          <span className="badge bg-light text-muted me-1">জার্সি ,</span>
          <span className="badge bg-light text-muted me-1">ছাগল ,</span>
          <span className="badge bg-light text-muted">মহিষ</span>
        </div>
      </div>
    </div>

    
    <div className="col-md-3">
      <div className="card p-3 h-100 shadow-sm">
        <div className="fs-1 mb-2">🐓</div>
        <h5 className="fw-bold">মুরগি পালন</h5>
        <p className="text-muted">Poultry Farming</p>
        <small>মুরগি, হাঁস ও অন্যান্য পাখি পালন</small>
        <div className="mt-2">
          <span className="badge bg-light text-muted me-1">দেশি মুরগি ,</span>
          <span className="badge bg-light text-muted me-1">ব্রয়লার ,</span>
          <span className="badge bg-light text-muted me-1">হাঁস ,</span>
          <span className="badge bg-light text-muted">কোয়েল ,</span>
        </div>
      </div>
    </div>
  </div>
</div>

      </section>
    </>
  );
}

export default Home;
