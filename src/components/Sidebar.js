
import React from "react";
import "../App.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Community Stats */}
      <div className="widget">
        <h3>কমিউনিটি পরিসংখ্যান</h3>
        <p>মোট সদস্য: ২৫,৮৫৬</p>
        <p>আজ সক্রিয়: ২,৩৪৩</p>
        <p>মোট আলোচনা: ৮,৪৫৬</p>
        <p>সমাধান হয়েছে: ৬,৭৮৯</p>
      </div>

      {/* Trending Topics */}
      <div className="widget">
        <h3>আলোচিত বিষয়</h3>
        <ul>
          <li>#আমান ধানের দাম বৃদ্ধি</li>
          <li>#চিংড়ি চাষের সুরক্ষা</li>
          <li>#গাভীর দুধ উৎপাদন</li>
          <li>#মুরগির ভ্যাকসিন তালিকা</li>
          <li>#জৈব সার তৈরি</li>
        </ul>
      </div>

      {/* Popular Categories */}
      <div className="widget">
        <h3>জনপ্রিয় বিভাগ</h3>
        <ul>
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
      <div className="widget">
        <h3>গুরুত্বপূর্ণ অবদানকারী</h3>
        <ol>
          <li>ড. আব্দুর রহমান – 1450</li>
          <li>ফারুক উদ্দিন – 1120</li>
          <li>ফাতেমা খাতুন – 890</li>
          <li>রাকিবুল ইসলাম – 756</li>
          <li>সালমা বেগম – 643</li>
        </ol>
      </div>

      {/* Quick Actions */}
      <div className="widget">
        <h3>দ্রুত কার্যক্রম</h3>
        <ul>
          <li>❓ প্রশ্ন করুন</li>
          <li>📘 জ্ঞান শেয়ার করুন</li>
          <li>👨‍🌾 বিশেষজ্ঞ খুঁজুন</li>
        </ul>
      </div>
    </div>
  );
}
