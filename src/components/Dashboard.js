import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
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
          <button className="btn btn-success active">কৃষক</button>
          <button className="btn btn-outline-secondary">বিশেষজ্ঞ</button>
          <button className="btn btn-outline-secondary">সমন্বয়কারী</button>
          <button className="btn btn-outline-secondary">উদ্যোক্তা</button>
          <button className="btn btn-outline-secondary">সরবরাহকারী</button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4">
        {/* Crop & Soil Condition */}
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
    </div>
  );
}

export default Dashboard;
