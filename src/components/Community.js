import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

export default function Community() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সকল");
  const [loading, setLoading] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [liveUsers, setLiveUsers] = useState(0);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Green themed categories
  const categories = [
    { name: "সকল", icon: "🌿", color: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)" },
    { name: "মৎস্য চাষ", icon: "🐟", color: "linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)" },
    { name: "প্রাণিসম্পদ", icon: "🐄", color: "linear-gradient(135deg, #4CAF50 0%, #FF9800 100%)" },
    { name: "ফসল চাষ", icon: "🌾", color: "linear-gradient(135deg, #4CAF50 0%, #FFC107 100%)" },
    { name: "পোল্ট্রি", icon: "🐔", color: "linear-gradient(135deg, #4CAF50 0%, #E91E63 100%)" },
    { name: "জৈব চাষ", icon: "🍃", color: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)" },
    { name: "প্রযুক্তি", icon: "💻", color: "linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)" },
    { name: "বাজার", icon: "💰", color: "linear-gradient(135deg, #4CAF50 0%, #FF9800 100%)" },
    { name: "সাধারণ", icon: "💬", color: "linear-gradient(135deg, #4CAF50 0%, #9C27B0 100%)" }
  ];

  // Post segments
  const postSegments = {
    TIP: { name: "টিপস", icon: "💡", color: "#4CAF50" },
    QUESTION: { name: "প্রশ্ন", icon: "❓", color: "#FF9800" },
    EXPERIENCE: { name: "অভিজ্ঞতা", icon: "📚", color: "#2196F3" },
    PROBLEM: { name: "সমস্যা", icon: "⚠️", color: "#F44336" },
    NEWS: { name: "খবর", icon: "📢", color: "#9C27B0" },
    ACHIEVEMENT: { name: "সাফল্য", icon: "🏆", color: "#FFC107" }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate('/login');
      return;
    }

    loadPosts();
    loadComments();
    
    const interval = setInterval(() => {
      loadNewPosts();
      updateLiveUsers();
      simulateLiveComments();
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  const loadPosts = () => {
    setLoading(true);
    setTimeout(() => {
      const savedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
      if (savedPosts.length === 0) {
        setPosts(generateSamplePosts());
      } else {
        setPosts(savedPosts);
      }
      setLoading(false);
    }, 500);
  };

  const loadComments = () => {
    const savedComments = JSON.parse(localStorage.getItem('postComments')) || {};
    setComments(savedComments);
  };

  const loadNewPosts = () => {
    const savedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    if (savedPosts.length !== posts.length) {
      setPosts(savedPosts);
    }
  };

  const updateLiveUsers = () => {
    const randomUsers = Math.floor(Math.random() * 50) + 20;
    setLiveUsers(randomUsers);
  };

  const simulateLiveComments = () => {
    if (Math.random() > 0.7 && posts.length > 0) {
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      const sampleComments = [
        "ভালো পোস্ট! 👍",
        "আমিও একই সমস্যায় পড়েছি",
        "ধন্যবাদ শেয়ার করার জন্য",
        "দারুণ তথ্য 💚",
        "আমারও এই অভিজ্ঞতা হয়েছে",
        "কীভাবে আরও জানতে পারি?",
        "অসাধারণ শেয়ার 🌱"
      ];
      
      const newComment = {
        id: Date.now(),
        userId: `user${Math.floor(Math.random() * 10)}`,
        userName: ["রহিম", "করিম", "ফাতেমা", "সালমা", "জাহিদ", "আয়েশা"][Math.floor(Math.random() * 6)],
        content: sampleComments[Math.floor(Math.random() * sampleComments.length)],
        timestamp: new Date().toISOString(),
        likes: 0
      };

      const updatedComments = {
        ...comments,
        [randomPost.id]: [...(comments[randomPost.id] || []), newComment]
      };
      
      setComments(updatedComments);
      localStorage.setItem('postComments', JSON.stringify(updatedComments));
    }
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const toggleExpand = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleComments = (postId) => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId);
    setNewComment("");
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    const updatedComments = {
      ...comments,
      [postId]: [...(comments[postId] || []), comment]
    };

    setComments(updatedComments);
    setNewComment("");
    localStorage.setItem('postComments', JSON.stringify(updatedComments));

    // Update post comment count
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: (post.comments || 0) + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const generateSamplePosts = () => {
    const samplePosts = [
      // Big Technology Posts
      {
        id: 1,
        userId: "tech1",
        userName: "ড. আহমেদ হোসেন",
        userRole: "কৃষি প্রযুক্তিবিদ",
        userLocation: "ঢাকা",
        userAvatar: "👨‍💻",
        content: "🌱 **স্মার্ট ফার্মিং প্রযুক্তি** নিয়ে বিশেষ প্রতিবেদন: আর্টিফিশিয়াল ইন্টেলিজেন্স এবং IoT এর মাধ্যমে কৃষি বিপ্লব! ড্রোন টেকনোলজি, সেন্সর নেটওয়ার্ক, এবং অটোমেটেড ইরিগেশন সিস্টেম কীভাবে বাংলাদেশের কৃষিকে ডিজিটালাইজড করছে তা নিয়ে বিস্তারিত আলোচনা। এই প্রযুক্তিগুলি ফসলের উৎপাদন ৪০% পর্যন্ত বৃদ্ধি করতে সক্ষম। বর্তমানে দেশের ৫০টি উপজেলায় এই প্রযুক্তি প্রয়োগ করা হয়েছে এবং ফলাফল অত্যন্ত আশাব্যঞ্জক।",
        image: null,
        category: "প্রযুক্তি",
        segment: "খবর",
        likes: 156,
        comments: 42,
        shares: 28,
        views: 890,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        liked: false,
        isLive: true,
        isFeatured: true,
        isBigPost: true
      },
      {
        id: 2,
        userId: "tech2",
        userName: "সায়েদা আক্তার",
        userRole: "এগ্রো-টেক বিশেষজ্ঞ",
        userLocation: "গাজীপুর",
        userAvatar: "👩‍🔬",
        content: "📱 **কৃষি অ্যাপ ডেভেলপমেন্ট**: কীভাবে মোবাইল অ্যাপ্লিকেশন কৃষকদের জীবন সহজ করছে? বর্তমানে বাংলাদেশে ৫০টির বেশি কৃষি অ্যাপ সক্রিয় রয়েছে যা আবহাওয়া পূর্বাভাস, বাজার দর, রোগবালাই নির্ণয় এবং বিশেষজ্ঞ পরামর্শ প্রদান করছে। এই ডিজিটাল ট্রান্সফর্মেশন কীভাবে গ্রামীণ অর্থনীতিকে শক্তিশালী করছে তা নিয়ে বিস্তারিত বিশ্লেষণ। বিশেষ করে 'কৃষি বাতায়ন', 'e-কৃষি' এবং 'ডিজিটাল কৃষি' অ্যাপগুলোর সাফল্য লক্ষণীয়।",
        image: null,
        category: "প্রযুক্তি",
        segment: "টিপস",
        likes: 98,
        comments: 31,
        shares: 15,
        views: 567,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        liked: false,
        isLive: true,
        isFeatured: true,
        isBigPost: true
      },
      // Big Market Posts
      {
        id: 3,
        userId: "market1",
        userName: "মোঃ সেলিম উদ্দিন",
        userRole: "বাজার বিশ্লেষক",
        userLocation: "চট্টগ্রাম",
        userAvatar: "👨‍💼",
        content: "📈 **২০২৪ সালের কৃষি পণ্য বাজার পূর্বাভাস**: ধান, আলু, পেঁয়াজ এবং মাছের বাজার ব্যবস্থাপনা নিয়ে বিশেষ প্রতিবেদন। বৈশ্বিক বাজার অবস্থা, রপ্তানি সুযোগ, এবং স্থানীয় চাহিদা বিশ্লেষণ। কীভাবে কৃষকরা তাদের উৎপাদন পরিকল্পনা করে সর্বোচ্চ মুনাফা অর্জন করতে পারবেন তার রোডম্যাপ। বর্তমান বাজার বিশ্লেষণ অনুযায়ী, আসন্ন মৌসুমে আলু ও পেঁয়াজের দাম স্থিতিশীল থাকার সম্ভাবনা রয়েছে।",
        image: null,
        category: "বাজার",
        segment: "খবর",
        likes: 134,
        comments: 56,
        shares: 32,
        views: 1023,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        liked: false,
        isLive: true,
        isFeatured: true,
        isBigPost: true
      },
      // Regular posts
      {
        id: 4,
        userId: "user1",
        userName: "মোঃ করিম উদ্দিন",
        userRole: "মৎস্যচাষী",
        userLocation: "কক্সবাজার",
        userAvatar: "👨‍🌾",
        content: "চিংড়ি চাষে রোগ প্রতিরোধের কার্যকর উপায় শেয়ার করছি। আমি নিম্নোক্ত পদ্ধতি অনুসরণ করি: নিয়মিত পানি পরীক্ষা, সঠিক খাদ্য ব্যবস্থাপনা, এবং প্রাকৃতিক প্রতিষেধক ব্যবহার। বিশেষ করে বর্ষাকালে পানির গুণগত মান নিয়ন্ত্রণ করা খুবই গুরুত্বপূর্ণ।",
        image: null,
        category: "মৎস্য চাষ",
        segment: "টিপস",
        likes: 67,
        comments: 28,
        shares: 5,
        views: 234,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        liked: false,
        isLive: true
      },
      {
        id: 5,
        userId: "user2",
        userName: "ফাতেমা খাতুন",
        userRole: "খামারি",
        userLocation: "পাবনা",
        userAvatar: "👩‍🌾",
        content: "গাভীর দুধ উৎপাদন বৃদ্ধির জন্য আমার অভিজ্ঞতা: পুষ্টিকর খাদ্য, নিয়মিত স্বাস্থ্য পরীক্ষা, এবং সঠিক বাসস্থান ব্যবস্থাপনা খুবই গুরুত্বপূর্ণ। আমি দেখেছি যে গাভীর জন্য সুষম খাদ্য এবং পর্যাপ্ত বিশুদ্ধ পানি সরবরাহ দুধের উৎপাদন শতকরা ৩০ ভাগ পর্যন্ত বৃদ্ধি করতে পারে।",
        image: null,
        category: "প্রাণিসম্পদ",
        segment: "অভিজ্ঞতা",
        likes: 45,
        comments: 19,
        shares: 3,
        views: 189,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        liked: false,
        isLive: true
      }
    ];
    localStorage.setItem('communityPosts', JSON.stringify(samplePosts));
    return samplePosts;
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userRole: roleLabels[user.role] || user.role,
      userLocation: user.location || "বাংলাদেশ",
      userAvatar: "👤",
      content: newPost,
      image: null,
      category: selectedCategory === "সকল" ? "সাধারণ" : selectedCategory,
      segment: "সাধারণ",
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      timestamp: new Date().toISOString(),
      liked: false,
      isLive: true,
      isFeatured: false,
      isBigPost: false
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
    setNewPost("");
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const alreadyLiked = post.liked;
        return {
          ...post,
          likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
          liked: !alreadyLiked
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const handleShare = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const filteredPosts = selectedCategory === "সকল" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  const isCommunityActive = location.pathname === '/community';

  const roleLabels = {
    Farmer: "কৃষক",
    Expert: "কৃষি বিশেষজ্ঞ",
    Coordinator: "স্থানীয় সমন্বয়কারী",
    Entrepreneur: "স্টার্টআপ উদ্যোক্তা",
    Supplier: "সরবরাহকারী",
    Investor: "বিনিয়োগকারী",
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return "এইমাত্র";
    if (diffInMinutes < 60) return `${diffInMinutes} মিনিট আগে`;
    if (diffInHours < 24) return `${diffInHours} ঘণ্টা আগে`;
    if (diffInDays === 1) return "গতকাল";
    return `${diffInDays} দিন আগে`;
  };

  const formatCommentTime = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - commentTime) / 1000);
    if (diffInSeconds < 60) return "এইমাত্র";
    return `${Math.floor(diffInSeconds/60)} মিনিট আগে`;
  };

  return (
    <>
      <style>
        {`
          .green-gradient-bg {
            background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%) !important;
          }
          
          .featured-post {
            border: 3px solid #4CAF50 !important;
            background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
          }
          
          .big-post {
            font-size: 1.1em;
            line-height: 1.8;
          }
          
          .live-comment {
            animation: slideInUp 0.3s ease-out;
            border-left: 3px solid #4CAF50;
            background: #f9f9f9;
          }
          
          @keyframes slideInUp {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          .green-glow {
            box-shadow: 0 0 15px rgba(76, 175, 80, 0.4) !important;
          }
          
          .category-card {
            transition: all 0.3s ease;
            border: none;
            border-radius: 12px;
            cursor: pointer;
          }
          
          .category-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          
          .post-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          
          .post-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(76, 175, 80, 0.15);
          }
          
          .avatar-green {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: white;
          }
          
          .btn-green {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            border: none;
            color: white;
            transition: all 0.3s ease;
          }
          
          .btn-green:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(76, 175, 80, 0.4);
          }
          
          .live-pulse {
            animation: pulse 1.5s infinite;
          }
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .comment-section {
            max-height: 300px;
            overflow-y: auto;
            background: #f8f9fa;
            border-radius: 10px;
            padding: 10px;
          }
          
          .featured-badge {
            background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
            color: white;
            font-weight: bold;
            border-radius: 20px;
            padding: 5px 15px;
            font-size: 0.8em;
          }
        `}
      </style>

      {/* Green Themed Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark green-gradient-bg shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/home">
            <span className="fs-3">🌾</span>
            <div className="ms-2">
              <div className="fw-bold">BD কৃষি দিবানিশি</div>
              <small className="opacity-75">সবুজের অভিযাত্রায়</small>
            </div>
          </Link>

          <div className="d-flex align-items-center me-3 text-white">
            <span className="badge bg-warning live-pulse me-2">LIVE</span>
            <small>{liveUsers} জন অনলাইনে</small>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {["হোম", "ড্যাশবোর্ড", "কমিউনিটি", "রিসোর্স", "বাজার"].map((item) => (
                <li key={item} className="nav-item">
                  <Link className={`nav-link ${location.pathname.includes(item.toLowerCase()) ? 'active fw-bold' : ''}`} to={`/${item === 'হোম' ? '' : item.toLowerCase()}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="d-flex">
              {user ? (
                <>
                  <Link to="/profile">
                    <button className="btn btn-outline-light btn-sm me-2">
                      {roleLabels[user.role] || user.name}
                    </button>
                  </Link>
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    লগআউট
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <button className="btn btn-outline-light btn-sm">লগইন</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <span className="badge bg-success live-pulse me-2">লাইভ</span>
            <h2 className="fw-bold text-success mb-0">কৃষি কমিউনিটি</h2>
          </div>
          <p className="text-muted">সবুজের সমারোহে জ্ঞানের বিনিময়</p>
          <div className="d-flex justify-content-center gap-3">
            <small className="text-success">
              <i className="fas fa-circle me-1"></i> {posts.filter(p => p.isLive).length} সক্রিয় পোস্ট
            </small>
            <small className="text-primary">
              <i className="fas fa-comments me-1"></i> {Object.values(comments).flat().length} লাইভ মন্তব্য
            </small>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {/* Create Post */}
            {user && (
              <div className="card post-card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="avatar-green me-3">
                      {user.avatar || "👤"}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">{user.name}</h6>
                      <small className="text-muted">{roleLabels[user.role] || user.role}</small>
                    </div>
                  </div>
                  
                  <textarea
                    className="form-control mb-3"
                    rows="3"
                    placeholder="আপনার চিন্তা শেয়ার করুন..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    style={{borderRadius: '10px'}}
                  />
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <select 
                      className="form-select me-2"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{width: 'auto', borderRadius: '10px'}}
                    >
                      {categories.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                    <button className="btn btn-green" onClick={handleCreatePost} disabled={!newPost.trim()}>
                      পোস্ট করুন
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 text-success">ক্যাটাগরি নির্বাচন করুন:</h6>
              <div className="row g-2">
                {categories.map(category => (
                  <div key={category.name} className="col-4 col-md-3 col-lg-2">
                    <div 
                      className={`category-card text-center p-2 ${selectedCategory === category.name ? 'green-glow' : ''}`}
                      onClick={() => setSelectedCategory(category.name)}
                      style={{background: category.color, color: 'white'}}
                    >
                      <div className="fs-5">{category.icon}</div>
                      <small>{category.name}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div>
              {filteredPosts.map(post => {
                const isExpanded = expandedPosts[post.id];
                const showSeeMore = post.content.length > 120;
                const segment = postSegments[Object.keys(postSegments).find(key => postSegments[key].name === post.segment)] || {};
                const postComments = comments[post.id] || [];
                
                return (
                  <div key={post.id} className={`card post-card mb-4 ${post.isFeatured ? 'featured-post' : ''}`}>
                    <div className="card-body">
                      {/* Post Header */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-green me-3">
                            {post.userAvatar}
                          </div>
                          <div>
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0 fw-bold">{post.userName}</h6>
                              {post.isLive && (
                                <span className="badge bg-danger ms-2 live-pulse">লাইভ</span>
                              )}
                            </div>
                            <small className="text-muted">
                              {post.userRole} • {post.userLocation} • {formatTime(post.timestamp)}
                            </small>
                            <div className="mt-1">
                              <span className="badge me-1" style={{backgroundColor: segment.color, color: 'white'}}>
                                {segment.icon} {post.segment}
                              </span>
                              <span className="badge bg-success">{post.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className={`post-content ${post.isBigPost ? 'big-post' : ''}`}>
                        <p className="card-text">
                          {isExpanded ? post.content : truncateText(post.content, post.isBigPost ? 200 : 120)}
                        </p>
                        {showSeeMore && (
                          <button 
                            className="btn btn-link p-0 text-success text-decoration-none"
                            onClick={() => toggleExpand(post.id)}
                          >
                            {isExpanded ? '▲ কম দেখান' : '▼ আরও দেখুন'}
                          </button>
                        )}
                      </div>

                      {/* Post Stats */}
                      <div className="d-flex justify-content-between text-muted small my-3">
                        <span>👍 {post.likes} লাইক</span>
                        <span>💬 {postComments.length} মন্তব্য</span>
                        <span>🔄 {post.shares} শেয়ার</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 border-top pt-3">
                        <button 
                          className={`btn btn-sm flex-fill ${post.liked ? 'btn-danger' : 'btn-outline-danger'}`}
                          onClick={() => handleLike(post.id)}
                        >
                          {post.liked ? '❤️ লাইকড' : '🤍 লাইক'}
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-success flex-fill"
                          onClick={() => toggleComments(post.id)}
                        >
                          💬 মন্তব্য ({postComments.length})
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-primary flex-fill"
                          onClick={() => handleShare(post.id)}
                        >
                          🔄 শেয়ার
                        </button>
                      </div>

                      {/* Comments Section */}
                      {activeCommentPost === post.id && (
                        <div className="mt-3">
                          <div className="comment-section">
                            {postComments.map(comment => (
                              <div key={comment.id} className="live-comment p-2 mb-2 rounded">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <strong className="text-success">{comment.userName}</strong>
                                    <p className="mb-0 mt-1">{comment.content}</p>
                                  </div>
                                  <small className="text-muted">{formatCommentTime(comment.timestamp)}</small>
                                </div>
                              </div>
                            ))}
                            {postComments.length === 0 && (
                              <div className="text-center text-muted py-3">
                                এখনও কোন মন্তব্য নেই। প্রথম মন্তব্য করুন!
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-2">
                            <div className="input-group">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder="মন্তব্য লিখুন..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                              />
                              <button 
                                className="btn btn-success" 
                                onClick={() => handleAddComment(post.id)}
                              >
                                পাঠান
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}