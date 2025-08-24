// Dashboard.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [selectedRole, setSelectedRole] = useState('farmer');

  const renderFarmerDashboard = () => (
    <div className="row g-4">
      {/* Farm Condition */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="text-success fw-bold">🌱 আমার খামারের অবস্থা</h6>
          <p className="text-muted small">বর্তমান ফসল ও জমির অবস্থা / Current crop and field conditions</p>
          <div className="bg-light p-2 rounded">
            <p className="mb-1"><strong>আমন ধান</strong> <span className="badge bg-secondary ms-2">বর্ধনশীল</span></p>
            <p className="mb-1">মাটির আর্দ্রতা: <span className="text-success">উপযুক্ত</span></p>
            <p className="mb-1">পরবর্তী সেচ: <span className="fw-bold">২ দিন</span></p>
            <p className="text-muted small mt-2">📍 ঢাকা, সাভার</p>
          </div>
        </div>
      </div>

      {/* Expert Advice */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="fw-bold">💬 বিশেষজ্ঞ পরামর্শ</h6>
          <p className="text-muted small">কৃষি বিশেষজ্ঞদের কাছ থেকে পরামর্শ নিন</p>
          <input type="text" className="form-control mb-2" placeholder="প্রশ্ন করুন" />
          <p className="text-muted small">৩টি অমীমাংসিত প্রশ্ন</p>
          <p className="text-muted small">শেষ পরামর্শ: ৫ দিন আগে</p>
        </div>
      </div>

      {/* Market Prices */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="fw-bold">📈 বাজার দাম</h6>
          <p className="text-muted small">সর্বশেষ পণ্যের দাম / Latest commodity prices</p>
          <ul className="list-unstyled">
            <li>ধান (প্রতি কেজি): <span className="text-success fw-bold">৩৫ টাকা ↑</span></li>
            <li>গম (প্রতি কেজি): <span className="text-danger fw-bold">৩২ টাকা ↓</span></li>
            <li>শুঁটকি (প্রতি কেজি): <span className="fw-bold">৮০ টাকা →</span></li>
          </ul>
          <p className="text-muted small">📍 কাওরান বাজার, ঢাকা</p>
        </div>
      </div>
    </div>
  );

  const renderExpertDashboard = () => (
    <div className="row g-4">
      {/* Active Advice */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="fw-bold text-primary">🧑‍🌾 সক্রিয় পরামর্শ</h6>
          <p className="text-muted small">কৃষকেরা আপনার দক্ষতা খুঁজছেন</p>
          <div className="bg-warning bg-opacity-10 p-2 rounded mb-2">
            <p className="mb-1 fw-bold">পোকামাকড় নিয়ন্ত্রণ প্রশ্ন</p>
            <p className="mb-1 small text-muted">প্রশ্নক: রহিম উদ্দিন (নরসিংদী)</p>
            <span className="badge bg-success">জরুরি</span>
          </div>
          <button className="btn btn-dark btn-sm w-100">সব দেখুন (১৫টি)</button>
        </div>
      </div>

      {/* Knowledge Contribution */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="fw-bold text-success">📖 জ্ঞান ভাগাভাগি</h6>
          <p className="text-muted small">শিক্ষা কেন্দ্রে অবদান রাখুন</p>
          <button className="btn btn-dark w-100 mb-2">আর্টিকেল তৈরি করুন</button>
          <button className="btn btn-outline-dark w-100">ভিডিও আপলোড</button>
          <p className="text-muted small mt-2">এই মাসে ১৫টি আর্টিকেল প্রকাশিত</p>
        </div>
      </div>

      {/* Field Visit */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="fw-bold text-purple">📅 মাঠ পরিদর্শন</h6>
          <p className="text-muted small">নির্ধারিত খামার পরিদর্শন</p>
          <div className="bg-light p-2 rounded">
            <p className="mb-1 fw-bold">মাটি পরীক্ষা</p>
            <p className="mb-1 small">আগামীকাল, সকাল ১০:০০</p>
            <p className="mb-0 text-muted small">স্থান: রামপুর গ্রাম, টাঙ্গাইল</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCoordinatorDashboard = () => (
    <div className="row g-4">
      {/* Local Farmer Stats */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="fw-bold text-danger">📍 আঞ্চলিক পরিস্থিতি</h6>
          <p className="text-muted small">আপনার এলাকার কৃষকরা</p>
          <ul className="list-unstyled">
            <li>নিবন্ধিত কৃষক: <strong>৩৮৫জন</strong></li>
            <li>এই মাসে সক্রিয়: <strong>২৯৮জন</strong></li>
          </ul>
          <button className="btn btn-dark btn-sm w-100 mt-2">নতুন কৃষক নিবন্ধন</button>
          <p className="text-muted small mt-2">📍 কিশোরগঞ্জ সদর উপজেলা</p>
        </div>
      </div>

      {/* Field Reports */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
         <h6 className="fw-bold text-primary">❗ মাঠ প্রতিবেদন</h6>
          <p className="text-muted small">সাম্প্রতিক মাঠ পর্যবেক্ষণ</p>
          <button className="btn btn-dark w-100 mb-2">প্রতিবেদন আপলোড</button>
          <p className="text-muted small">এই সপ্তাহে ৮টি প্রতিবেদন</p>
          <p className="text-muted small">২টি পর্যালোচনার অপেক্ষায়</p>
        </div>
      </div>

      {/* Coordination Programs */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="fw-bold text-success">🤝 সমন্বয় কার্যক্রম</h6>
          <p className="text-muted small">চলমান কৃষক সহায়তা</p>
          <div className="bg-warning bg-opacity-25 p-2 rounded mb-2">
            প্রশিক্ষণ: জৈব কৃষি পদ্ধতি
          </div>
          <div className="bg-info bg-opacity-25 p-2 rounded mb-2">
            বীজ বিতরণ অনুষ্ঠান
          </div>
          <button className="btn btn-outline-dark btn-sm w-100">সব কার্যক্রম দেখুন</button>
        </div>
      </div>
    </div>
  );

const renderEntrepreneurDashboard = () => (
    <div className="row g-4">
      {/* প্রযুক্তি প্রদর্শনী */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="text-primary"><i className="bi bi-phone"></i>💡 প্রযুক্তি প্রদর্শনী</h6>
          <p className="text-muted small">আপনার উদ্ভাবন শেয়ার করুন</p>
          <button className="btn btn-dark w-100 mb-2">নতুন প্রযুক্তি প্রদর্শন</button>
          <button className="btn btn-outline-dark w-100">উপস্থাপনা নির্ধারণ</button>
          <p className="text-muted small mt-2">৩টি সক্রিয় প্রদর্শনী</p>
        </div>
      </div>

      {/* পাইলট প্রকল্প */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="text-primary"><i className="bi bi-people"></i>🚀 পাইলট প্রকল্প</h6>
          <p className="text-muted small">সহযোগিতামূলক পরীক্ষা কর্মসূচি</p>
          <div className="bg-light p-2 rounded mb-2">
            <p className="mb-1 fw-bold">স্মার্ট সেচ ব্যবস্থা</p>
            <p className="mb-1 small">৫জন কৃষক অংশগ্রহণ</p>
            <p className="text-muted small">২য় পর্যায়</p>
          </div>
          <button className="btn btn-dark w-100">নতুন প্রকল্প শুরু</button>
        </div>
      </div>

      {/* প্রভাব মেট্রিক্স */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="text-success"><i className="bi bi-graph-up"></i>📈 প্রভাব মেট্রিক্স</h6>
          <p className="text-muted small">প্রযুক্তি গ্রহণের হার</p>
          <p><strong>পৌঁছানো কৃষক:</strong> ২৩৮জন</p>
          <p><strong>প্রযুক্তি গ্রহণ:</strong> ৮৯%</p>
          <p className="text-success">ফলন বৃদ্ধি: +২৮%</p>
        </div>
      </div>
    </div>
  );



  const renderSupplierDashboard = () => (
    <div className="row g-4">
      {/* পণ্য ক্যাটালগ */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="text-success"><i className="bi bi-currency-dollar"></i>🏷️ পণ্য ক্যাটালগ</h6>
          <p className="text-muted small">আপনার পণ্য ব্যবস্থাপনা</p>
          <button className="btn btn-dark w-100 mb-2">নতুন পণ্য যোগ</button>
          <button className="btn btn-outline-secondary w-100 mb-2">ইনভেন্টরি আপডেট</button>
          <p className="text-muted small">৬৮টি পণ্য তালিকাভুক্ত</p>
        </div>
      </div>

      {/* বিতরণকারী নেটওয়ার্ক */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="text-primary"><i className="bi bi-people"></i>👥 বিতরণকারী নেটওয়ার্ক</h6>
          <p className="text-muted small">অংশীদার সংযোগ</p>
          <ul className="list-unstyled mb-2">
            <li>সক্রিয় বিতরণকারী: <strong>৩৪জন</strong></li>
            <li>কভারেজ এলাকা: <strong>১২ জেলা</strong></li>
          </ul>
          <button className="btn btn-dark w-100">নতুন অংশীদার খুঁজুন</button>
        </div>
      </div>

      {/* বিক্রয় বিশ্লেষণ */}
      <div className="col-md-4">
        <div className="border rounded p-3 shadow-sm h-100">
          <h6 className="text-purple"><i className="bi bi-graph-up"></i>📊 বিক্রয় বিশ্লেষণ</h6>
          <p className="text-muted small">কার্যক্রম পরিসংখ্যান</p>
          <ul className="list-unstyled">
            <li>মাসিক বিক্রয়: <span className="text-success">৪.৮ লক্ষ ↑</span></li>
            <li>জনপ্রিয় পণ্য: <em>জৈব সার</em></li>
            <li>গ্রাহক সন্তুষ্টি: <span className="text-success">৪.৭/৫</span></li>
          </ul>
        </div>
      </div>
    </div>
  );


  return (
    <div className="container py-5">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">ব্যক্তিগত ড্যাশবোর্ড</h2>
        <p className="text-muted">Personalized Dashboard</p>
        <p>কৃষি ইকোসিস্টেমে ‌আপনার ভূমিকার উপর ভিত্তি করে বিশেষ টুলস এবং তথ্য</p>
      </div>

      {/* Role Tabs */}
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group">
          <button
            className={`btn ${selectedRole === 'farmer' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setSelectedRole('farmer')}
          >
            কৃষক
          </button>
          <button
            className={`btn ${selectedRole === 'expert' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setSelectedRole('expert')}
          >
            বিশেষজ্ঞ
          </button>
          <button
            className={`btn ${selectedRole === 'coordinator' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setSelectedRole('coordinator')}
          >
            সমন্বয়কারী
          </button>
          <button
            className={`btn ${selectedRole === 'entrepreneur' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setSelectedRole('entrepreneur')}
          >
            উদ্যোক্তা
          </button>
          <button
            className={`btn ${selectedRole === 'supplier' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setSelectedRole('supplier')}
          >
            সরবরাহকারী
          </button>
        </div>
      </div>


      {/* Conditional Dashboard Rendering */}
      {selectedRole === 'farmer' && renderFarmerDashboard()}
      {selectedRole === 'expert' && renderExpertDashboard()}
      {selectedRole === 'coordinator' && renderCoordinatorDashboard()}
       {selectedRole === 'entrepreneur' && renderEntrepreneurDashboard()}
       {selectedRole === 'supplier' && renderSupplierDashboard()}
    </div>
  );
}

export default Dashboard;
