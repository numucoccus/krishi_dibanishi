import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ResourceCard({ icon, title, description, author, downloads, size, type }) {
  return (
    <Card className="p-3 shadow-sm h-100">
      <Row>
        <Col xs={2} className="d-flex align-items-start justify-content-center">
          <div style={{ fontSize: '2rem' }}>{icon}</div>
        </Col>
        <Col xs={10}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-success text-white">{type}</span>
            <small className="text-muted">{size}</small>
          </div>
          <h5 className="fw-bold">{title}</h5>
          <p className="mb-1 text-muted">{description}</p>
          <p className="mb-1" style={{ fontSize: '0.85rem' }}>
            লেখক: <span className="fw-semibold">{author}</span>
          </p>
          <div className="d-flex justify-content-between align-items-center mt-2" style={{ fontSize: '0.85rem' }}>
            <span>⬇ {downloads} ডাউনলোড</span>
            <Button variant="outline-success" size="sm">ডাউনলোড</Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

function Resources() {
  const [activeTab, setActiveTab] = useState('courses'); // courses, resources, experts, webinars

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-success">
            BD <span className="text-dark">কৃষি দিবানিশি</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="mx-2">হোম</Nav.Link>
              <Nav.Link as={Link} to="/dashboard" className="mx-2">ড্যাশবোর্ড</Nav.Link>
              <Nav.Link as={Link} to="/community" className="mx-2">কমিউনিটি</Nav.Link>
              <Nav.Link as={Link} to="/resources" className="mx-2">রিসোর্স</Nav.Link>
              <Nav.Link as={Link} to="/market" className="mx-2">বাজার</Nav.Link>
            </Nav>
            <Button variant="success" className="fw-bold text-white">কৃষক</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MAIN CONTENT */}
      <Container className="mt-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">শিক্ষা ও রিসোর্স কেন্দ্র</h2>
          <p className="text-muted">Learning & Resource Center</p>
          <p>কৃষি, মৎস্য ও প্রাণিসম্পদ বিষয়ক বিশ্লেষক জ্ঞান, প্রশিক্ষণ এবং সর্বাধিক তথ্য সংগ্রহ</p>
        </div>

        {/* Search Bar */}
        <div className="d-flex align-items-center justify-content-center mb-4">
          <Form.Control
            type="text"
            placeholder="কোর্স, গাইড বা ভিডিও খুঁজুন..."
            className="me-2"
            style={{ maxWidth: '500px' }}
          />
          <Button variant="outline-secondary">🔍 ফিল্টার</Button>
        </div>

        {/* Category Cards */}
        <Row className="mb-4 text-center">
          {[
            { icon: "🌾", title: "ফসল চাষ", subtitle: "Crop Farming", count: 156 },
            { icon: "🐟", title: "মাছ চাষ", subtitle: "Fish Farming", count: 89 },
            { icon: "🐄", title: "গবাদিপশু", subtitle: "Livestock", count: 73 },
            { icon: "🐔", title: "পোল্ট্রি", subtitle: "Poultry", count: 64 },
          ].map((cat, index) => (
            <Col md={3} sm={6} className="mb-3" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>{cat.icon}</div>
                  <h5 className="mt-2 fw-bold">{cat.title}</h5>
                  <p className="text-muted">{cat.subtitle}</p>
                  <span className="badge bg-primary">{cat.count} রিসোর্স</span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Tabs */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          {[
            { id: 'courses', label: 'কোর্সসমূহ' },
            { id: 'resources', label: 'রিসোর্স' },
            { id: 'experts', label: 'বিশেষজ্ঞ' },
            { id: 'webinars', label: 'ওয়েবিনার' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'success' : 'light'}
              className="fw-bold border"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <>
            <h4 className="fw-bold mb-4">বৈশিষ্ট্যমূলক কোর্স</h4>
            <Row className="g-4">
              {[
                {
                  icon: "🌾", category: "ফসল চাষ", level: "মধ্যম",
                  title: "আধুনিক ধান চাষ পদ্ধতি",
                  subtitle: "Modern Rice Cultivation Methods",
                  desc: "উচ্চ ফলনশীল ধান চাষের আধুনিক কৌশল এবং জাত নির্বাচন",
                  author: "ড. রফিকুল ইসলাম — কৃষি বিশেষজ্ঞ, দিনাজপুর",
                  duration: "⏱ ৪ ঘন্টা", lessons: "📄 ১২ পাঠ", rating: "⭐ 4.9 (2340 শিক্ষার্থী)", price: "বিনামূল্যে"
                },
                {
                  icon: "🐟", category: "মাছ চাষ", level: "প্রাথমিক",
                  title: "পুকুরে মাছ চাষের সম্পূর্ণ গাইড",
                  subtitle: "Complete Guide to Pond Fish Farming",
                  desc: "খাদ্য, কাঁচামাল ও রোগ প্রতিরোধসহ সম্পূর্ণ পদ্ধতি",
                  author: "প্রফেসর আব্দুল করিম — মৎস্য বিশেষজ্ঞ, বগুড়া",
                  duration: "⏱ ৩.৫ ঘন্টা", lessons: "📄 ১০ পাঠ", rating: "⭐ 4.8 (1850 শিক্ষার্থী)", price: "৮০০ টাকা"
                },
                {
                  icon: "🐄", category: "গবাদিপশু", level: "উন্নত",
                  title: "দুধ উৎপাদনে আধুনিক প্রযুক্তি",
                  subtitle: "Modern Technology in Milk Production",
                  desc: "গবাদিপশু পালন ও দুধ উৎপাদনের আধুনিক যন্ত্রপাতি ও কৌশল",
                  author: "ড. সোহেল রানা — পশু চিকিৎসক, সিলেট",
                  duration: "⏱ ৫ ঘন্টা", lessons: "📄 ১৫ পাঠ", rating: "⭐ 4.7 (1500 শিক্ষার্থী)", price: "১২০০ টাকা"
                },
                {
                  icon: "🐔", category: "পোল্ট্রি", level: "মধ্যম",
                  title: "মুরগি পালনের আধুনিক পদ্ধতি",
                  subtitle: "Modern Poultry Farming Methods",
                  desc: "উচ্চ ফলনশীল মুরগি পালন এবং রোগ প্রতিরোধ ব্যবস্থাপনা",
                  author: "ড. মিনহাজুল ইসলাম — প্রাণিসম্পদ বিশেষজ্ঞ, খুলনা",
                  duration: "⏱ ৪.৫ ঘন্টা", lessons: "📄 ১৩ পাঠ", rating: "⭐ 4.6 (1300 শিক্ষার্থী)", price: "বিনামূল্যে"
                }
              ].map((course, index) => (
                <Col md={6} key={index} className="d-flex flex-column">
                  <Card className="p-3 shadow-sm flex-grow-1">
                    <Row>
                      <Col xs={2}>
                        <div style={{ fontSize: '2rem' }}>{course.icon}</div>
                      </Col>
                      <Col xs={10}>
                        <div className="d-flex justify-content-between">
                          <span className="badge bg-light text-dark border">{course.category}</span>
                          <span className="badge bg-light text-dark border">{course.level}</span>
                        </div>
                        <h5 className="fw-bold mt-2 mb-0">{course.title}</h5>
                        <p className="text-muted mb-1">{course.subtitle}</p>
                        <p className="mb-1" style={{ fontSize: '0.9rem' }}>{course.desc}</p>
                        <p className="mb-1 text-secondary" style={{ fontSize: '0.85rem' }}>{course.author}</p>
                        <div className="d-flex justify-content-between flex-wrap mt-2 text-muted" style={{ fontSize: '0.85rem' }}>
                          <span>{course.duration}</span>
                          <span>{course.lessons}</span>
                          <span>{course.rating}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <span className="text-success fw-bold">{course.price}</span>
                          <Button className="fw-bold" variant="success">কোর্সে ভর্তি হন</Button>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

         {/* Resources Tab */}
        {activeTab === 'resources' && (
          <>
            <h4 className="fw-bold mb-4">বিনামূল্যে রিসোর্স</h4>
            <Row className="g-4">
              <Col md={6}>
                <ResourceCard
                  icon="🗓️"
                  category="ফসল চাষ"
                  title="বাংলাদেশের প্রধান ফসলের চাষাবাদ ক্যালেন্ডার"
                  subtitle="Cultivation Calendar for Major Crops in Bangladesh"
                  author="কৃষি মন্ত্রণালয়"
                  downloads="5420"
                  size="2.3 MB"
                  type="PDF"
                />
              </Col>
              <Col md={6}>
                <ResourceCard
                  icon="🦐"
                  category="মাছ চাষ"
                  title="চিংড়ি চাষে রোগ নিয়ন্ত্রণ"
                  subtitle="Disease Control in Shrimp Farming"
                  author="ড. মাহবুব হাসান"
                  downloads="12450"
                  size="২৮ মিনিট"
                  type="VIDEO"
                  isVideo
                />
              </Col>
              <Col md={6}>
                <ResourceCard
                  icon="🐐"
                  category="গবাদিপশু"
                  title="ছাগল পালনের আধুনিক পদ্ধতি"
                  subtitle="Modern Goat Rearing Methods"
                  author="বাংলাদেশ প্রাণিসম্পদ গবেষণা ইনস্টিটিউট"
                  downloads="3210"
                  size="45 পৃষ্ঠা"
                  type="GUIDE"
                />
              </Col>
              <Col md={6}>
                <ResourceCard
                  icon="💉"
                  category="পোল্ট্রি"
                  title="মুরগির ভ্যাকসিন ক্যালেন্ডার অ্যাপ"
                  subtitle="Poultry Vaccination Calendar App"
                  author="কৃষি নিরীক্ষণ"
                  downloads="8970"
                  size="অ্যাপ"
                  type="APP"
                />
              </Col>
            </Row>
          </>
        )}

        {activeTab === 'experts' && (
          <>
            <h4 className="fw-bold">বিশেষজ্ঞ পরিচিতি</h4>
            <p>এই সেকশনে বিশেষজ্ঞদের বিস্তারিত তথ্য এবং যোগাযোগ থাকবে।</p>
          </>
        )}

        {activeTab === 'webinars' && (
          <>
            <h4 className="fw-bold">ওয়েবিনার</h4>
            <p>ওয়েবিনার শিডিউল ও রেকর্ডিং এখানে দেখানো হবে।</p>
          </>
        )}
      </Container>
    </>
  );
}

export default Resources;
