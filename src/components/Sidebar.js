// src/components/Sidebar.js
import React from "react";
import "../App.css";

export default function Sidebar() {
  return (
    <div className="col-lg-4">
      <div className="d-flex flex-column gap-4">

        {/* Community Stats */}
        <div className="border rounded p-3 shadow-sm bg-white">
          <h5 className="fw-bold text-success">📊 কমিউনিটি পরিসংখ্যান</h5>
          <p>মোট সদস্য: ২৫,৮৯৬</p>
          <p>আজ সক্রিয়: ২,১৩৪</p>
          <p>মোট আলোচনা: ৮,৪৫৬</p>
          <p>সমাধান হয়েছে: ৬,৭৮৯</p>
        </div>

        {/* Trending Topics */}
        <div className="border rounded p-3 shadow-sm bg-white">
          <h5 className="fw-bold text-primary">🗣️ আলোচিত বিষয়</h5>
          <ul className="list-unstyled mb-0">
            <li>#আমান ধানের দাম বৃদ্ধি</li>
            <li>#চিংড়ি চাষের সুরক্ষা</li>
            <li>#গাভীর দুধ উৎপাদন</li>
            <li>#মুরগির ভ্যাকসিন তালিকা</li>
            <li>#জৈব সার তৈরি</li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div className="border rounded p-3 shadow-sm bg-white">
          <h5 className="fw-bold text-warning">🌟 জনপ্রিয় বিভাগ</h5>
          <ul className="list-unstyled mb-0">
            <li>🌾 ফসল চাষ (234)</li>
            <li>🐟 মৎস্য চাষ (189)</li>
            <li>🐄 প্রাণিসম্পদ (156)</li>
            <li>🐓 পোল্ট্রি (134)</li>
            <li>🍀 জৈব চাষ (98)</li>
            <li>💰 বাজার দাম (145)</li>
            <li>💻 প্রযুক্তি (87)</li>
            <li>⭐ সফলতার গল্প (76)</li>
          </ul>
        </div>

        {/* Top Contributors */}
        <div className="border rounded p-3 shadow-sm bg-white">
          <h5 className="fw-bold text-danger">🏅 শীর্ষ অবদানকারী</h5>
          <ol className="mb-0">
            <li>ড. আব্দুর রহমান – 1450</li>
            <li>করিম উদ্দিন – 1120</li>
            <li>ফাতেমা খাতুন – 890</li>
            <li>রফিকুল ইসলাম – 756</li>
            <li>সালমা বেগম – 643</li>
          </ol>
        </div>

        {/* Quick Actions */}
        <div className="border rounded p-3 shadow-sm bg-white">
          <h5 className="fw-bold text-info">দ্রুত কার্যক্রম</h5>
          <ul className="list-unstyled mb-0">
            <li>❓ প্রশ্ন করুন</li>
            <li>📘 জ্ঞান শেয়ার করুন</li>
            <li>👨‍🌾 বিশেষজ্ঞ খুঁজুন</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
