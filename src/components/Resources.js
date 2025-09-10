import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Resources() {
  const [activeTab, setActiveTab] = useState('courses'); // tabs: courses, resources, experts, webinars

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
            <div className="d-flex">
              <Button variant="success" className="fw-bold text-white">কৃষক</Button>
            </div>
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
          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>🌾</div>
                <h5 className="mt-2 fw-bold">ফসল চাষ</h5>
                <p className="text-muted">Crop Farming</p>
                <span className="badge bg-primary">156 রিসোর্স</span>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>🐟</div>
                <h5 className="mt-2 fw-bold">মাছ চাষ</h5>
                <p className="text-muted">Fish Farming</p>
                <span className="badge bg-primary">89 রিসোর্স</span>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>🐄</div>
                <h5 className="mt-2 fw-bold">গবাদিপশু</h5>
                <p className="text-muted">Livestock</p>
                <span className="badge bg-primary">73 রিসোর্স</span>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>🐔</div>
                <h5 className="mt-2 fw-bold">পোল্ট্রি</h5>
                <p className="text-muted">Poultry</p>
                <span className="badge bg-primary">64 রিসোর্স</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabs (bottom buttons) */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          <Button
            variant={activeTab === 'courses' ? 'success' : 'light'}
            className="fw-bold border"
            onClick={() => setActiveTab('courses')}
          >
            কোর্সসমূহ
          </Button>
          <Button
            variant={activeTab === 'resources' ? 'success' : 'light'}
            className="fw-bold border"
            onClick={() => setActiveTab('resources')}
          >
            রিসোর্স
          </Button>
          <Button
            variant={activeTab === 'experts' ? 'success' : 'light'}
            className="fw-bold border"
            onClick={() => setActiveTab('experts')}
          >
            বিশেষজ্ঞ
          </Button>
          <Button
            variant={activeTab === 'webinars' ? 'success' : 'light'}
            className="fw-bold border"
            onClick={() => setActiveTab('webinars')}
          >
            ওয়েবিনার
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'courses' && (
          <>
            <h4 className="fw-bold mb-4">বৈশিষ্ট্যমূলক কোর্স</h4>

            <Row className="g-4">
              {/* Course Card 1 */}
              <Col md={6} className="d-flex flex-column">
                <Card className="p-3 shadow-sm flex-grow-1">
                  <Row>
                    <Col xs={2} className="d-flex align-items-start">
                      <div style={{ fontSize: '2rem' }}>🌾</div>
                    </Col>
                    <Col xs={10}>
                      <div className="d-flex justify-content-between">
                        <span className="badge bg-light text-dark border">ফসল চাষ</span>
                        <span className="badge bg-light text-dark border">মধ্যম</span>
                      </div>
                      <h5 className="fw-bold mt-2 mb-0">আধুনিক ধান চাষ পদ্ধতি</h5>
                      <p className="text-muted mb-1">Modern Rice Cultivation Methods</p>
                      <p className="mb-1" style={{ fontSize: '0.9rem' }}>
                        উচ্চ ফলনশীল ধান চাষের আধুনিক কৌশল এবং বাংলাদেশের উপযোগী জাত নির্বাচন
                      </p>
                      <p className="mb-1 text-secondary" style={{ fontSize: '0.85rem' }}>
                        ড. রফিকুল ইসলাম — কৃষি বিশেষজ্ঞ, দিনাজপুর
                      </p>
                      <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                        <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                          <span>⏱ ৪ ঘন্টা</span>
                          <span>📄 ১২ পাঠ</span>
                          <span>⭐ 4.9 (2340 শিক্ষার্থী)</span>
                        </div>
                        <span className="text-success fw-bold">বিনামূল্যে</span>
                      </div>
                      <Button className="mt-3 w-100 fw-bold" variant="success">কোর্সে ভর্তি হন</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Course Card 2 */}
              <Col md={6} className="d-flex flex-column">
                <Card className="p-3 shadow-sm flex-grow-1">
                  <Row>
                    <Col xs={2} className="d-flex align-items-start">
                      <div style={{ fontSize: '2rem' }}>🐟</div>
                    </Col>
                    <Col xs={10}>
                      <div className="d-flex justify-content-between">
                        <span className="badge bg-light text-dark border">মাছ চাষ</span>
                        <span className="badge bg-light text-dark border">প্রাথমিক</span>
                      </div>
                      <h5 className="fw-bold mt-2 mb-0">পুকুরে মাছ চাষের সম্পূর্ণ গাইড</h5>
                      <p className="text-muted mb-1">Complete Guide to Pond Fish Farming</p>
                      <p className="mb-1" style={{ fontSize: '0.9rem' }}>
                        খাদ্য, কাঁচামাল, মূল্যন চাষের বৈজ্ঞানিক পদ্ধতি এবং রোগ প্রতিরোধ
                      </p>
                      <p className="mb-1 text-secondary" style={{ fontSize: '0.85rem' }}>
                        প্রফেসর আব্দুল করিম — মৎস্য বিশেষজ্ঞ, বগুড়া
                      </p>
                      <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                        <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                          <span>⏱ ৩.৫ ঘন্টা</span>
                          <span>📄 ১০ পাঠ</span>
                          <span>⭐ 4.8 (1850 শিক্ষার্থী)</span>
                        </div>
                        <span className="text-success fw-bold">৮০০ টাকা</span>
                      </div>
                      <Button className="mt-3 w-100 fw-bold" variant="success">কোর্সে ভর্তি হন</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Course Card 3 */}
              <Col md={6} className="d-flex flex-column">
                <Card className="p-3 shadow-sm flex-grow-1">
                  <Row>
                    <Col xs={2} className="d-flex align-items-start">
                      <div style={{ fontSize: '2rem' }}>🐄</div>
                    </Col>
                    <Col xs={10}>
                      <div className="d-flex justify-content-between">
                        <span className="badge bg-light text-dark border">গবাদিপশু</span>
                        <span className="badge bg-light text-dark border">উন্নত</span>
                      </div>
                      <h5 className="fw-bold mt-2 mb-0">দুধ উৎপাদনে আধুনিক প্রযুক্তি</h5>
                      <p className="text-muted mb-1">Modern Technology in Milk Production</p>
                      <p className="mb-1" style={{ fontSize: '0.9rem' }}>
                        গবাদিপশু পালন ও দুধ উৎপাদনের জন্য আধুনিক যন্ত্রপাতি ও পদ্ধতি
                      </p>
                      <p className="mb-1 text-secondary" style={{ fontSize: '0.85rem' }}>
                        ড. সোহেল রানা — পশু চিকিৎসক, সিলেট
                      </p>
                      <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                        <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                          <span>⏱ ৫ ঘন্টা</span>
                          <span>📄 ১৫ পাঠ</span>
                          <span>⭐ 4.7 (1500 শিক্ষার্থী)</span>
                        </div>
                        <span className="text-success fw-bold">১২০০ টাকা</span>
                      </div>
                      <Button className="mt-3 w-100 fw-bold" variant="success">কোর্সে ভর্তি হন</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Course Card 4 */}
              <Col md={6} className="d-flex flex-column">
                <Card className="p-3 shadow-sm flex-grow-1">
                  <Row>
                    <Col xs={2} className="d-flex align-items-start">
                      <div style={{ fontSize: '2rem' }}>🐔</div>
                    </Col>
                    <Col xs={10}>
                      <div className="d-flex justify-content-between">
                        <span className="badge bg-light text-dark border">পোল্ট্রি</span>
                        <span className="badge bg-light text-dark border">মধ্যম</span>
                      </div>
                      <h5 className="fw-bold mt-2 mb-0">মুরগি পালনের আধুনিক পদ্ধতি</h5>
                      <p className="text-muted mb-1">Modern Poultry Farming Techniques</p>
                      <p className="mb-1" style={{ fontSize: '0.9rem' }}>
                        মুরগির স্বাস্থ্য, খাবার ও বাচ্চা উৎপাদন সংক্রান্ত সম্পূর্ণ গাইড
                      </p>
                      <p className="mb-1 text-secondary" style={{ fontSize: '0.85rem' }}>
                        মিস্টার আলমগীর হোসেন — পোল্ট্রি বিশেষজ্ঞ, খুলনা
                      </p>
                      <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                        <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                          <span>⏱ ৪.৫ ঘন্টা</span>
                          <span>📄 ১৩ পাঠ</span>
                          <span>⭐ 4.6 (1200 শিক্ষার্থী)</span>
                        </div>
                        <span className="text-success fw-bold">৯০০ টাকা</span>
                      </div>
                      <Button className="mt-3 w-100 fw-bold" variant="success">কোর্সে ভর্তি হন</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </>
        )}

        {activeTab === 'resources' && (
          <div className="text-center py-5 text-muted">
            <h5>রিসোর্স পেজ নির্মাণাধীন...</h5>
            <p>শিগগিরই এখানে প্রয়োজনীয় গাইড, আর্টিকেল ও ভিডিও পাওয়া যাবে।</p>
          </div>
        )}

        {activeTab === 'experts' && (
          <div className="text-center py-5 text-muted">
            <h5>বিশেষজ্ঞ পেজ নির্মাণাধীন...</h5>
            <p>বিশেষজ্ঞদের তালিকা এবং যোগাযোগ তথ্য শিগগিরই প্রদান করা হবে।</p>
          </div>
        )}

        {activeTab === 'webinars' && (
          <div className="text-center py-5 text-muted">
            <h5>ওয়েবিনার পেজ নির্মাণাধীন...</h5>
            <p>আসন্ন ও শেষ হওয়া ওয়েবিনারের তথ্য এখানে দেখতে পারবেন।</p>
          </div>
        )}
      </Container>
    </>
  );
}

export default Resources;
