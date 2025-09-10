import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function Resources() {
  return (
    <Container className="mt-5">
      {/* Header */}
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

      {/* Tabs (like buttons) */}
      <div className="d-flex justify-content-center gap-3 mb-5">
        <Button variant="light" className="fw-bold border">কোর্সসমূহ</Button>
        <Button variant="light" className="fw-bold border">রিসোর্স</Button>
        <Button variant="light" className="fw-bold border">গাইডলাইন</Button>
      </div>
    </Container>
  );
}

export default Resources;
