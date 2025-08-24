import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';


function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/home">BD <span className="text-dark">কৃষি দিবানিশি</span></Link>

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
              <button className="btn btn-success me-2">কৃষক</button>
              <Link to="/login" className="btn btn-outline-danger">লগইন/রেজিস্টার</Link>

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
           <Link to="/join" className="btn btn-success btn-lg">আজই যোগ দিন / Join Today</Link>

           
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



{/* Community Partners Section */}

<div className="text-center mt-5">
  <h3 className="fw-bold mb-2">আমাদের কমিউনিটি অংশীদার</h3>
  <p className="text-muted mb-4">Our Community Partners</p>

  <div className="row g-4 justify-content-center">


    {/* Agricultural Experts */}
    <div className="col-md-4">
      <div className="card h-100 p-3 border-start border-3 border-primary bg-light-subtle shadow-sm">
        <h5 className="fw-bold"><span className="me-2">📖</span>কৃষি বিশেষজ্ঞ</h5>
        <p className="text-muted mb-1">Agricultural Experts</p>
        <small>ফসল, মৎস্য ও প্রাণিসম্পদ বিশেষজ্ঞ পরামর্শ, সর্বোত্তম চাষাবাদ পদ্ধতি ও বিশ্লেষণ</small>
        <p className="mt-2 text-muted fst-italic">Expert guidance in crops, fisheries, livestock, best practices & analysis</p>
      </div>
    </div>



    {/* Local Coordinators */}
    <div className="col-md-4">
      <div className="card h-100 p-3 border-start border-3 border-success bg-light-subtle shadow-sm">
        <h5 className="fw-bold"><span className="me-2">🛡️</span>স্থানীয় সমন্বয়কারী</h5>
        <p className="text-muted mb-1">Local Coordinators</p>
        <small>কৃষক, মৎস্যচাষী ও খামারিদের সহায়তা, নিবন্ধন ও মাঠ পর্যায়ের রিপোর্ট</small>
        <p className="mt-2 text-muted fst-italic">Support farmers, fish farmers & livestock owners, registration & field reports</p>
      </div>
    </div>




    {/* Startup Innovators */}
    <div className="col-md-4">
      <div className="card h-100 p-3 border-start border-3 border-dark bg-light-subtle shadow-sm">
        <h5 className="fw-bold"><span className="me-2">⚙️</span>স্টার্টআপ উদ্যোক্তা</h5>
        <p className="text-muted mb-1">Startup Innovators</p>
        <small>আধুনিক কৃষি, মৎস্য ও প্রাণিসম্পদ প্রযুক্তি, স্মার্ট সমাধান ও উদ্ভাবন</small>
        <p className="mt-2 text-muted fst-italic">Modern agri, fishery & livestock tech, smart solutions & innovations</p>
      </div>
    </div>




    {/* Supply Chain Partners */}
    <div className="col-md-4">
      <div className="card h-100 p-3 border-start border-3 border-warning bg-light-subtle shadow-sm">
        <h5 className="fw-bold"><span className="me-2">🛒</span>সরবরাহ শৃঙ্খল অংশীদার</h5>
        <p className="text-muted mb-1">Supply Chain Partners</p>
        <small>বীজ, সার, মৎস্য খাদ্য, পশুখাদ্য, ঔষধ ও যন্ত্রপাতি সরবরাহ</small>
        <p className="mt-2 text-muted fst-italic">Seeds, fertilizers, fish feed, animal feed, medicines & equipment</p>
      </div>
    </div>




    {/* Investors & Sponsors */}
    <div className="col-md-4">
      <div className="card h-100 p-3 border-start border-3 border-danger bg-light-subtle shadow-sm">
        <h5 className="fw-bold"><span className="me-2">❤️</span>বিনিয়োগকারী ও স্পন্সর</h5>
        <p className="text-muted mb-1">Investors & Sponsors</p>
        <small>কৃষি, মৎস্য ও প্রাণিসম্পদ উন্নয়নে বিনিয়োগ, প্রশিক্ষণ ও অবকাঠামো অর্থায়ন</small>
        <p className="mt-2 text-muted fst-italic">Investments in development, training & infrastructure support</p>
      </div>
    </div>
  </div>
</div>





{/* Knowledge & Resource Exchange Section */}
<div className="text-center mt-5">
  <h3 className="fw-bold mb-2">জ্ঞান, প্রযুক্তি ও সহায়তার আদান-প্রদান</h3>
  <p className="text-muted mb-4">Exchange Knowledge, Technology & Support</p>

  <div className="row justify-content-center">
    <div className="col-md-10">
      <div className="bg-white p-4 rounded shadow-sm">
        <h5 className="fw-bold mb-2"><span className="me-2">📖</span>শিক্ষা ও রিসোর্স কেন্দ্র</h5>
        <p className="text-muted mb-2">
          কৃষি, মৎস্য ও প্রাণিসম্পদ বিষয়ক শিক্ষামূলক সামগ্রী: ভিডিও টিউটোরিয়াল, সর্বোত্তম চর্চা, প্রযুক্তি গাইড এবং কমিউনিটি অভিজ্ঞতা
        </p>
        <p className="text-muted fst-italic">
          Educational Materials on Agriculture, Fisheries & Livestock: Video Tutorials, Best Practices, Technology Guides & Community Experiences
        </p>
        <div className="mt-4 d-flex justify-content-center gap-3">
          <a href="/resources" className="btn btn-primary">রিসোর্স দেখুন / Explore Resources</a>
          <a href="/community" className="btn btn-outline-success">কমিউনিটিতে যোগ দিন / Join Community</a>
        </div>
      </div>
    </div>
  </div>
</div>


{/* Personalized Dashboard Section */}
<div className="text-center mt-5 mb-5">
  <h3 className="fw-bold mb-2">ব্যক্তিগত ড্যাশবোর্ড</h3>
  <p className="text-muted mb-4">Personalized Dashboard</p>
  <p className="text-muted">কৃষি ইকোসিস্টেমে ‌আপনার ভূমিকার উপর ভিত্তি করে বিশেষ টুলস এবং তথ্য</p>

  {/* Role Selection Buttons */}
  <div className="d-flex justify-content-center mt-3 mb-4">
    <div className="btn-group" role="group" aria-label="Role selection">
      <button type="button" className="btn btn-outline-secondary active">কৃষক</button>
      <button type="button" className="btn btn-outline-secondary">বিশেষজ্ঞ</button>
      <button type="button" className="btn btn-outline-secondary">সমন্বয়কারী</button>
      <button type="button" className="btn btn-outline-secondary">উদ্যোক্তা</button>
      <button type="button" className="btn btn-outline-secondary">সরবরাহকারী</button>
    </div>
  </div>

  {/* Dashboard Cards */}
  <div className="row justify-content-center mt-4">
    {/* Card 1: Farm Status */}
    <div className="col-md-3">
      <div className="card h-100 p-3 text-start shadow-sm">
        <h6 className="fw-bold text-success">🌱 আমার খামারের অবস্থা</h6>
        <p className="text-muted small mb-1">বর্তমান ফসল ও জমির অবস্থা / Current crop and field conditions</p>
        <ul className="list-unstyled small">
        <li>
  🌾 আমন ধান
  <span className="badge bg-secondary ms-2">বর্ধনশীল</span>
</li>

          <li>🟢 মাটির আর্দ্রতা: <span className="text-success fw-bold">উপযুক্ত</span></li>    
          <li>📆 পরবর্তী সেট: <span className="fw-bold">২ দিন</span></li>
        </ul>
        <p className="text-muted small">📍 ঢাকা, সাভার</p>
      </div>
    </div>

    {/* Card 2: Expert Advice */}
    <div className="col-md-3">
      <div className="card h-100 p-3 text-start shadow-sm">
        <h6 className="fw-bold text-primary">💬 বিশেষজ্ঞ পরামর্শ</h6>
        <p className="text-muted small">কৃষি বিশেষজ্ঞদের কাছ থেকে পরামর্শ নিন</p>
        <input type="text" className="form-control mb-2" placeholder="প্রশ্ন করুন" />
        <p className="text-muted small">৩টি অমীমাংসিত প্রশ্ন<br />শেষ পরামর্শ: ২ দিন আগে</p>
      </div>
    </div>

    {/* Card 3: Market Prices */}
    <div className="col-md-3">
      <div className="card h-100 p-3 text-start shadow-sm">
        <h6 className="fw-bold text-danger">📈 বাজার দাম</h6>
        <p className="text-muted small mb-1">সর্বশেষ পণ্যের দাম / Latest commodity prices</p>
        <ul className="list-unstyled small">
          <li>ধান: <span className="text-success fw-bold">৩৫ টাকা ⬆</span></li>
          <li>গম: <span className="text-danger fw-bold">৩২ টাকা ⬇</span></li>
          <li>শুঁটকি: <span className="fw-bold">৮০ টাকা →</span></li>
        </ul>
        <p className="text-muted small">📍 কাওরান বাজার, ঢাকা</p>
        </div>
       </div>
      </div>
  
</div>

      </section>
       
    </>
  );
}

export default Home;
