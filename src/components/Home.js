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

        </div>
      </section>
    </>
  );
}

export default Home;
