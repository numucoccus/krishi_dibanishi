import React from "react";
import DiscussionCard from "./DiscussionCard";
import Sidebar from "./Sidebar";
import "../App.css";

export default function Community() {
  const discussions = [
    {
      id: 1,
      category: "মৎস্য চাষ",
      title: "চিংড়ি চাষে রোগ প্রতিরোধের কার্যকর উপায়",
      subtitle: "Effective ways to prevent diseases in shrimp farming",
      author: "মোঃ ফারুক উদ্দিন",
      role: "মৎস্যচাষী - কক্সবাজার",
      comments: 28,
      likes: 67,
      views: 234,
      time: "২ ঘণ্টা আগে"
    },
    {
      id: 2,
      category: "প্রাণিসম্পদ",
      title: "গাভীর দুধ উৎপাদন বৃদ্ধির জন্য আমার অভিজ্ঞতা ",
      subtitle: "My experience in increasing cow milk production",
      author: "ফাতেমা খাতুন",
      role: "খামারি - পাবনা",
      comments: 19,
      likes: 45,
      views: 189,
      time: "৪ ঘণ্টা আগে"
    },
    {
      id: 3,
      category: "ফসল চাষ",
      title: "আমান ধানের নতুন জাত নিয়ে পরীক্ষামূলক চাষাবাদ",
      subtitle: "Experimental cultivation with new Aman rice variety",
      author: "ড. আব্দুর রহমান",
      role: "কৃষি বিশেষজ্ঞ - রংপুর",
      comments: 42,
      likes: 89,
      views: 356,
      time: "৬ ঘণ্টা আগে"
    },
    {
      id: 4,
      category: "পোল্ট্রি",
      title: "ব্রয়লার মুরগির খাদ্য তালিকা ও পুষ্টি ব্যবস্থাপনা",
      subtitle: "Broiler chicken diet and nutrition management",
      author: "রাকিবুল ইসলাম",
      role: "পোল্ট্রি খামারি - সাভার",
      comments: 15,
      likes: 32,
      views: 145,
      time: "৬ ঘণ্টা আগে"
    }
  ];

  return (
    <div className="community-container">
      <h1 className="community-header">কৃষি দিবানিশি কমিউনিটি</h1>
      <p className="community-subheader">
        সহ-কৃষক, বিশেষজ্ঞ ও উদ্যোক্তাদের সাথে জ্ঞান ভাগাভাগি ও সহযোগিতা নিন
      </p>

      <div className="main-layout">
        {/* Left: Discussions */}
        <div className="discussion-section">
          <div className="discussion-header">
            <h2>সাম্প্রতিক আলোচনা</h2>
            <button className="new-btn">নতুন আলোচনা শুরু করুন</button>
          </div>
          {discussions.map(d => (
            <DiscussionCard key={d.id} {...d} />
          ))}
        </div>

        {/* Right: Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
