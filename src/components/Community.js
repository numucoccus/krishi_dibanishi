import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "../App.css";

export default function Community() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(null);
  const [newPost, setNewPost] = useState({ headline: "", content: "", topic: "ফসল চাষ" });
  const [newComment, setNewComment] = useState("");
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  // Map roles to Bangla labels
const roleLabels = {
  Farmer: "কৃষক",
  Expert: "কৃষি বিশেষজ্ঞ", 
  Coordinator: "স্থানীয় সমন্বয়কারী",
  Innovator: "স্টার্টআপ উদ্যোক্তা",
  Supplier: "সরবরাহকারী",
  Investor: "বিনিয়োগকারী",
};

  const topics = [
    "সব বিষয়",
    "ফসল চাষ",
    "মৎস্য চাষ", 
    "প্রাণিসম্পদ",
    "পোল্ট্রি",
    "জৈব চাষ",
    "কৃষি প্রযুক্তি",
    "বাজার তথ্য",
    "অন্যান্য"
  ];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) setUser(loggedInUser);

    // Initialize socket connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    fetchPosts();

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for new posts
    socket.on("new-post", (post) => {
      setPosts(prev => [post, ...prev]);
    });

    // Listen for post updates (likes/comments)
    socket.on("post-updated", (updatedPost) => {
      setPosts(prev => prev.map(post => 
        post._id === updatedPost._id ? updatedPost : post
      ));
    });

    return () => {
      socket.off("new-post");
      socket.off("post-updated");
    };
  }, [socket]);

  const fetchPosts = async (topic = "all") => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts?topic=${topic}`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleTopicFilter = (topic) => {
    const filterValue = topic === "সব বিষয়" ? "all" : topic;
    setSelectedTopic(filterValue);
    fetchPosts(filterValue);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("লগইন করতে হবে পোস্ট করার জন্য");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newPost)
      });

      const data = await response.json();
      if (data.success) {
        setNewPost({ headline: "", content: "", topic: "ফসল চাষ" });
        setShowPostModal(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert("লাইক দিতে লগইন করুন");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId) => {
    if (!user) {
      alert("মন্তব্য করতে লগইন করুন");
      return;
    }

    if (!newComment.trim()) {
      alert("মন্তব্য লিখুন");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text: newComment })
      });

      const data = await response.json();
      if (data.success) {
        setNewComment("");
        setShowCommentModal(null);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const formatTime = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return "এক্ষুনি";
    if (diffInMinutes < 60) return `${diffInMinutes} মিনিট আগে`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ঘণ্টা আগে`;
    return `${Math.floor(diffInMinutes / 1440)} দিন আগে`;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login', { replace: true });
  };

  const isCommunityActive = location.pathname === '/community';

  return (
    <>
      {/* Community Navbar - Unchanged */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/home">
            BD <span className="text-dark">কৃষি দিবানিশি</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#CommunityNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="CommunityNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/home">হোম</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">ড্যাশবোর্ড</Link></li>
              <li className="nav-item">
                <Link className={`nav-link ${isCommunityActive ? 'active text-success fw-bold' : ''}`} to="/community">
                  কমিউনিটি
                </Link>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/resources">রিসোর্স</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/market">বাজার</Link></li>
            </ul>

            <div className="d-flex">
              {user ? (
                <>
                  <Link to="/profile">
  <button className="btn btn-success me-2">
    {roleLabels[user.role] || user.name}
  </button>
</Link>
                  <button className="btn btn-outline-danger" onClick={handleLogout}>লগআউট</button>
                </>
              ) : (
                <Link to="/login"><button className="btn btn-outline-success me-2">লগইন</button></Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Community Section */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">🌾 কৃষি দিবানিশি কমিউনিটি</h2>
          <p className="text-muted">সহ-কৃষক, বিশেষজ্ঞ ও উদ্যোক্তাদের সাথে জ্ঞান ভাগাভাগি ও সহযোগিতা নিন</p>
        </div>

        {/* Centered Topic Filter */}
        <div className="mb-4">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {topics.map(topic => (
              <button
                key={topic}
                className={`btn ${selectedTopic === (topic === "সব বিষয়" ? "all" : topic) ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                onClick={() => handleTopicFilter(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Create Post Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">সাম্প্রতিক পোস্ট</h4>
          <button 
            className="btn btn-success"
            onClick={() => setShowPostModal(true)}
          >
            📝 নতুন পোস্ট করুন
          </button>
        </div>

        {/* Posts List */}
        <div className="d-flex flex-column gap-3">
          {posts.map(post => (
            <div key={post._id} className="border rounded p-4 shadow-sm bg-white">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="badge bg-success">{post.topic}</span>
                  <h5 className="mt-2 mb-1">{post.headline}</h5>
                </div>
                <small className="text-muted">{formatTime(post.createdAt)}</small>
              </div>
              
              <p className="mb-3">{post.content}</p>
              
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    <strong>{post.userId?.name}</strong> ({post.userId?.role}) - {post.userId?.district}
                  </small>
                </div>
                
                <div className="d-flex gap-3">
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleLike(post._id)}
                  >
                    👍 {post.likes?.length || 0}
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowCommentModal(post._id)}
                  >
                    💬 {post.comments?.length || 0}
                  </button>
                </div>
              </div>

              {/* Display Comments */}
              {post.comments && post.comments.length > 0 && (
                <div className="mt-3 border-top pt-3">
                  <h6 className="fw-bold">মন্তব্যসমূহ:</h6>
                  {post.comments.map((comment, index) => (
                    <div key={index} className="mb-2 p-2 bg-light rounded">
                      <div className="d-flex justify-content-between">
                        <strong>{comment.userId?.name || "User"}:</strong>
                        <small className="text-muted">{formatTime(comment.createdAt)}</small>
                      </div>
                      <p className="mb-0">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">কোন পোস্ট পাওয়া যায়নি। প্রথম পোস্টটি您 তৈরি করুন!</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showPostModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">নতুন পোস্ট তৈরি করুন</h5>
                <button type="button" className="btn-close" onClick={() => setShowPostModal(false)}></button>
              </div>
              <form onSubmit={handleCreatePost}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">শিরোনাম</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newPost.headline}
                      onChange={(e) => setNewPost({...newPost, headline: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">বিষয়</label>
                    <select
                      className="form-select"
                      value={newPost.topic}
                      onChange={(e) => setNewPost({...newPost, topic: e.target.value})}
                    >
                      {topics.filter(t => t !== "সব বিষয়").map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">বিস্তারিত</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPostModal(false)}>বাতিল</button>
                  <button type="submit" className="btn btn-success">পোস্ট করুন</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Comment Modal */}
      {showCommentModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">মন্তব্য যোগ করুন</h5>
                <button type="button" className="btn-close" onClick={() => {
                  setShowCommentModal(null);
                  setNewComment("");
                }}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">আপনার মন্তব্য</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="আপনার মন্তব্য লিখুন..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowCommentModal(null);
                  setNewComment("");
                }}>বাতিল</button>
                <button type="button" className="btn btn-success" onClick={() => handleAddComment(showCommentModal)}>
                  মন্তব্য করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}