import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Marketplace = () => {
  return (
    <div className="bg-light py-4">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">কৃষি দিবানিশি মার্কেটপ্লেস</h2>
          <p className="text-muted">
            কৃষি, মৎস্য ও প্রাণিসম্পদের জন্য প্রয়োজনীয় সকল পণ্য ও সেবা এক জায়গায়। বিশ্বস্ত বিক্রেতা ও সাশ্রয়ী মূল্য।
          </p>
        </div>

        {/* Search & Filters */}
        <Row className="mb-4 justify-content-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="পণ্য, বীজ, যন্ত্রপাতি বা সেবা খুঁজুন..."
              className="shadow-sm"
            />
          </Col>
          <Col md="auto">
            <Button variant="outline-secondary" className="me-2">ফিল্টার</Button>
            <Button variant="outline-secondary">এলাকা</Button>
          </Col>
        </Row>

        {/* Categories */}
        <Row className="g-4 text-center mb-5">
          <Col md={3}>
            <Card className="p-3 h-100 shadow-sm">
              <div className="fs-2">🌱</div>
              <h5 className="fw-bold mt-2">বীজ ও চারা</h5>
              <p className="text-muted">Seeds & Seedlings</p>
              <span className="badge bg-light text-muted">২৩৪ পণ্য</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 h-100 shadow-sm">
              <div className="fs-2">🚜</div>
              <h5 className="fw-bold mt-2">যন্ত্রপাতি</h5>
              <p className="text-muted">Equipment</p>
              <span className="badge bg-light text-muted">১৮৯ পণ্য</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 h-100 shadow-sm">
              <div className="fs-2">🌾</div>
              <h5 className="fw-bold mt-2">খাদ্য ও সার</h5>
              <p className="text-muted">Feed & Fertilizer</p>
              <span className="badge bg-light text-muted">১৫৬ পণ্য</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 h-100 shadow-sm">
              <div className="fs-2">💉</div>
              <h5 className="fw-bold mt-2">ঔষধ ও ভ্যাকসিন</h5>
              <p className="text-muted">Medicine & Vaccines</p>
              <span className="badge bg-light text-muted">৪৩ পণ্য</span>
            </Card>
          </Col>
        </Row>

        {/* Offers Section */}
        <Row className="g-4">
          <Col md={6}>
            <Card className="p-3 border-start border-3 border-info bg-white shadow-sm h-100">
              <h5 className="fw-bold">🎁 সাপ্তাহিক ছাড়</h5>
              <p className="text-muted">সব ধরনের বীজে ২০% পর্যন্ত ছাড়</p>
              <p><small>বৈধতা: ৩১ জানুয়ারি পর্যন্ত | কোড: <strong>WINTER20</strong></small></p>
              <Button variant="danger">অফার পান</Button>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3 border-start border-3 border-success bg-white shadow-sm h-100">
              <h5 className="fw-bold">🛍️ বড় অর্ডারে ছাড়</h5>
              <p className="text-muted">৳১০,০০০ এর বেশি কেনাকাটায় ১৫% ছাড়</p>
              <p><small>বৈধতা: ১৫ ফেব্রুয়ারি পর্যন্ত | কোড: <strong>BULK15</strong></small></p>
              <Button variant="danger">অফার পান</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Marketplace;
