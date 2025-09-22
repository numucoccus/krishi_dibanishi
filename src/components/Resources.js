import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Resource Card Component
function ResourceCard({ icon, title, description, author, downloads, size, type }) {
  return (
    <Card className="p-3 shadow-sm h-100">
      <Row>
        <Col xs={2} className="d-flex align-items-start justify-content-center">
          <div style={{ fontSize: "2rem" }}>{icon}</div>
        </Col>
        <Col xs={10}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-success text-white">{type}</span>
            <small className="text-muted">{size}</small>
          </div>
          <h5 className="fw-bold">{title}</h5>
          <p className="mb-1 text-muted">{description}</p>
          <p className="mb-1" style={{ fontSize: "0.85rem" }}>
            লেখক: <span className="fw-semibold">{author}</span>
          </p>
          <div
            className="d-flex justify-content-between align-items-center mt-2"
            style={{ fontSize: "0.85rem" }}
          >
            <span>⬇ {downloads} ডাউনলোড</span>
            <Button variant="outline-success" size="sm">
              ডাউনলোড
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

function Resources() {
  const [activeTab, setActiveTab] = useState("courses");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // LocalStorage থেকে ইউজার আনুন
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  // Role mapping in Bangla
  const roleLabels = {
    Farmer: "কৃষক",
    Expert: "কৃষি বিশেষজ্ঞ",
    Coordinator: "স্থানীয় সমন্বয়কারী",
    Entrepreneur: "স্টার্টআপ উদ্যোক্তা",
    Supplier: "সরবরাহকারী",
    Investor: "বিনিয়োগকারী",
  };

  return (
    <>
      {/* Resources Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/home">
            BD <span className="text-dark">কৃষি দিবানিশি</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#ResourcesNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="ResourcesNavbar"
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
                <Link className="nav-link" to="/community">
                  কমিউনিটি
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/resources">
                  রিসোর্স
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/market">
                  বাজার
                </Link>
              </li>
            </ul>

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

      {/* MAIN CONTENT */}
      <Container className="mt-5">
        {/* Header */}
        <div className="text-center mb-4 mt-0">
          <h2 className="fw-bold">শিক্ষা ও রিসোর্স কেন্দ্র</h2>
          <p className="text-muted">Learning & Resource Center</p>
          <p>
            কৃষি, মৎস্য ও প্রাণিসম্পদ বিষয়ক বিশ্লেষক জ্ঞান, প্রশিক্ষণ এবং সর্বাধিক তথ্য সম্ভার
          </p>
        </div>

        {/* Search Bar */}
        <div className="d-flex align-items-center justify-content-center mb-4">
          <Form.Control
            type="text"
            placeholder="কোর্স, গাইড বা ভিডিও খুঁজুন..."
            className="me-2"
            style={{ maxWidth: "500px" }}
          />
          <Button variant="outline-secondary">🔍 ফিল্টার</Button>
        </div>

        {/* Tabs */}
        <Nav
          variant="tabs"
          activeKey={activeTab}
          onSelect={(tab) => setActiveTab(tab)}
          className="mb-4 justify-content-center"
        >
          <Nav.Item>
            <Nav.Link eventKey="courses">🎓 কোর্স</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="resources">📘 রিসোর্স</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="experts">👨‍🌾 বিশেষজ্ঞ</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="webinars">💻 ওয়েবিনার</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Content Based on Tab */}
        {activeTab === "courses" && (
          <Row className="g-4">
            <Col md={6}>
              <ResourceCard
                icon="📗"
                type="কোর্স"
                title="আধুনিক ধান চাষ পদ্ধতি"
                description="ধান চাষে উৎপাদনশীলতা বৃদ্ধির কৌশল"
                author="কৃষি বিশ্ববিদ্যালয়"
                downloads="120"
                size="5MB"
              />
            </Col>
            <Col md={6}>
              <ResourceCard
                icon="📘"
                type="কোর্স"
                title="মাছের রোগ প্রতিরোধ"
                description="পুকুরে মাছের স্বাস্থ্য ব্যবস্থাপনা"
                author="মৎস্য গবেষণা ইনস্টিটিউট"
                downloads="85"
                size="3MB"
              />
            </Col>
          </Row>
        )}

        {activeTab === "resources" && (
          <Row className="g-4">
            <Col md={6}>
              <ResourceCard
                icon="📄"
                type="গাইড"
                title="টমেটো চাষে আধুনিক পদ্ধতি"
                description="জৈব সার ব্যবহার করে টমেটো চাষ"
                author="সালমা বেগম"
                downloads="95"
                size="2MB"
              />
            </Col>
            <Col md={6}>
              <ResourceCard
                icon="📄"
                type="গাইড"
                title="গাভীর দুধ উৎপাদন বৃদ্ধির কৌশল"
                description="প্রাণিসম্পদ বিশেষজ্ঞদের সুপারিশকৃত গাইড"
                author="ফাতেমা খাতুন"
                downloads="60"
                size="1.5MB"
              />
            </Col>
          </Row>
        )}

        {activeTab === "experts" && (
          <Row className="g-4">
            <Col md={4}>
              <Card className="p-3 shadow-sm text-center">
                <h5 className="fw-bold">ড. আব্দুর রহমান</h5>
                <p className="text-muted">কৃষি বিশেষজ্ঞ</p>
                <Button variant="success" size="sm">
                  যোগাযোগ করুন
                </Button>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3 shadow-sm text-center">
                <h5 className="fw-bold">মোঃ করিম উদ্দিন</h5>
                <p className="text-muted">মৎস্য বিশেষজ্ঞ</p>
                <Button variant="success" size="sm">
                  যোগাযোগ করুন
                </Button>
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === "webinars" && (
          <Row className="g-4">
            <Col md={6}>
              <Card className="p-3 shadow-sm">
                <h5 className="fw-bold">স্মার্ট কৃষি প্রযুক্তি</h5>
                <p className="text-muted">অনলাইন ওয়েবিনার</p>
                <Button variant="outline-success" size="sm">
                  রেজিস্টার করুন
                </Button>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="p-3 shadow-sm">
                <h5 className="fw-bold">মৎস্য খাতে নতুন দিগন্ত</h5>
                <p className="text-muted">অনলাইন ওয়েবিনার</p>
                <Button variant="outline-success" size="sm">
                  রেজিস্টার করুন
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Resources;
