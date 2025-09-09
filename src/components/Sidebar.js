import React from "react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="box">
        <h3>কমিউনিটি পরিসংখ্যান</h3>
        <p>মোট সদস্য: ২৫,৮৫৯৬</p>
        <p>আজ সক্রিয়: ২,১৩৪</p>
        <p>মোট আলোচনা: ৮,৪৫৬</p>
        <p>সমাধান হয়েছে: ৬,৭১৯</p>
      </div>
      <div className="box">
        <h3>আলোচিত বিষয়</h3>
        <ul>
          <li>#আমান ধানের দাম বৃদ্ধি</li>
          <li>#চিংড়ি চাষ</li>
          <li>#গাভীর দুধ উৎপাদন</li>
          <li>#মুরগির ভ্যাকসিন</li>
        </ul>
      </div>
    </div>
  );
}

