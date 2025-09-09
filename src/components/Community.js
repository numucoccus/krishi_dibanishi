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
      title: "গাভীর দুধ উৎপাদন বৃদ্ধির জন্য আমার অভিজ্ঞতা",
      subtitle: "My experience in increasing cow milk production",
      author: "ফাতেমা খাতুন",
      role: "খামারি - পাবনা",
      comments: 19,
      likes: 45,
      views: 189,
      time: "৪ ঘণ্টা আগে"
    }
  ];

  return (
    <div className="container">
      <h1 className="header">কৃষি দিবানিশি কমিউনিটি</h1>
      <p className="subheader">
        সহ-কৃষক, বিশেষজ্ঞ ও উদ্যোক্তাদের সাথে জ্ঞান ভাগাভাগি ও সহযোগিতা নিন
      </p>
      <div className="main">
        <div className="content">
          <h2>সাম্প্রতিক আলোচনা</h2>
          {discussions.map(d => (
            <DiscussionCard key={d.id} {...d} />
          ))}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
