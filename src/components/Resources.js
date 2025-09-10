import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Resources() {
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
          <Button variant="light" className="fw-bold border">কোর্সসমূহ</Button>
          <Button variant="light" className="fw-bold border">রিসোর্স</Button>
          <Button variant="light" className="fw-bold border">গাইডলাইন</Button>
        </div>
      </Container>
    </>
  );
}

export default Resources;
