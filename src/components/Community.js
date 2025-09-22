import React, { useEffect, useState } from "react";
import DiscussionCard from "../components/DiscussionCard";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

export default function Community() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for logged-in user from localStorage (or any auth state)
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  // Map roles to Bangla labels
  const roleLabels = {
    Farmer: "কৃষক",
    Expert: "কৃষি বিশেষজ্ঞ",
    Coordinator: "স্থানীয় সমন্বয়কারী",
    Entrepreneur: "স্টার্টআপ উদ্যোক্তা",
    Supplier: "সরবরাহকারী",
    Investor: "বিনিয়োগকারী",
  };

  const discussions = [
    {
      id: 1,
      category: "মৎস্য চাষ",
      title: "চিংড়ি চাষে রোগ প্রতিরোধের কার্যকর উপায়",
      subtitle: "Effective ways to prevent diseases in shrimp farming",
      author: "মোঃ করিম উদ্দিন",
      role: "মৎস্যচাষী - কক্সবাজার",
      comments: "💬28",
      likes: "👍67",
      views: "👁️234",
      time: "⌚২ ঘণ্টা আগে",
    },
    {
      id: 2,
      category: "প্রাণিসম্পদ",
      title: "গাভীর দুধ উৎপাদন বৃদ্ধির জন্য আমার অভিজ্ঞতা",
      subtitle: "My experience in increasing cow milk production",
      author: "ফাতেমা খাতুন",
      role: "খামারি - পাবনা",
      comments: "💬19",
      likes: "👍45",
      views: "👁️189",
      time: "⌚৪ ঘণ্টা আগে",
    },
    {
      id: 3,
      category: "ফসল চাষ",
      title: "আমন ধানের নতুন জাত নিয়ে পরীক্ষামূলক চাষাবাদ",
      subtitle: "Experimental cultivation with new Aman rice variety",
      author: "ড. আব্দুর রহমান",
      role: "কৃষি বিশেষজ্ঞ - রংপুর",
      comments: "💬42",
      likes: "👍89",
      views: "👁️356",
      time: "⌚৬ ঘণ্টা আগে",
    },
    {
      id: 4,
      category: "পোল্ট্রি",
      title: "ব্রয়লার মুরগির খাদ্য তালিকা ও পুষ্টি ব্যবস্থাপনা",
      subtitle: "Broiler chicken diet and nutrition management",
      author: "রফিকুল ইসলাম",
      role: "পোল্ট্রি খামারি - গাজীপুর",
      comments: "💬15",
      likes: "👍32",
      views: "👁️145",
      time: "⌚৮ ঘণ্টা আগে",
    },
    {
      id: 5,
      category: "জৈব চাষ",
      title: "জৈব পদ্ধতিতে টমেটো চাষে সফলতার গল্প",
      subtitle: "Success story of organic tomato cultivation",
      author: "সালমা বেগম",
      role: "কৃষক - যশোর",
      comments: "💬22",
      likes: "👍5",
      views: "👁️120",
      time: "⌚১ দিন আগে",
    },
    {
      id: 6,
      category: "মৎস্য চাষ",
      title: "পুকুরে মাছের খাবার তৈরির সহজ পদ্ধতি",
      subtitle: "Simple method of making fish feed for ponds",
      author: "নজরুল ইসলাম",
      role: "মৎস্যচাষী - ময়মনসিংহ",
      comments: "💬12",
      likes: "👍30",
      views: "👁️98",
      time: "⌚১ দিন আগে",
    },
  ];

  return (
    <>
      {/* Community Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/home">
            BD <span className="text-dark">কৃষি দিবানিশি</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#CommunityNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="CommunityNavbar"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  হোম
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  ড্যাশবোর্ড
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/community">
                  কমিউনিটি
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resources">
                  রিসোর্স
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/market">
                  বাজার
                </Link>
              </li>
            </ul>

            {/* Dynamic Profile/Login Button */}
            <div className="d-flex">
              {user ? (
                <Link to="/profile">
                  <button className="btn btn-success me-2">
                    {roleLabels[user.role] || user.name}
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="btn btn-outline-success me-2">লগইন</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Community Section */}
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">🌾 কৃষি দিবানিশি কমিউনিটি</h2>
          <p className="text-muted">Krishi Dibanishi Community</p>
          <p className="text-muted">
            সহ-কৃষক, বিশেষজ্ঞ ও উদ্যোক্তাদের সাথে জ্ঞান ভাগাভাগি ও সহযোগিতা নিন
          </p>
        </div>

        {/* Layout */}
        <div className="row">
          {/* Discussions */}
          <div className="col-lg-8 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold">সাম্প্রতিক আলোচনা</h4>
              <button className="btn btn-outline-success btn-sm">
                নতুন আলোচনা শুরু করুন
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {discussions.map((d) => (
                <DiscussionCard key={d.id} {...d} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-4">
              <button className="btn btn-success">আরও আলোচনা লোড করুন</button>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
