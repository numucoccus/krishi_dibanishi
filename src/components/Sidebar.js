
import React from "react";
import { FaLeaf, FaFish, FaCow } from "react-icons/fa"; // icons

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Trending Topics */}
      <div className="box">
        <h3>আলোচিত বিষয়</h3>
        <ul>
          <li>#আমান ধানের দাম বৃদ্ধি</li>
          <li>#চিংড়ি চাষ</li>
          <li>#গাভীর দুধ উৎপাদন</li>
          <li>#মুরগির ভ্যাকসিন</li>
          <li>#জৈব সার তৈরি</li>
        </ul>
      </div>

      {/* Popular Categories */}
      <div className="box">
        <h3>জনপ্রিয় বিভাগ</h3>
        <ul className="categories">
          <li>
            <FaLeaf className="icon" /> ফসল চাষ <span className="count">234</span>
          </li>
          <li>
            <FaFish className="icon" /> মৎস্য চাষ <span className="count">189</span>
          </li>
          <li>
            <FaCow className="icon" /> প্রাণিসম্পদ <span className="count">156</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
