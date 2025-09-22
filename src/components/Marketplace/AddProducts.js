import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const AddProducts = ({ show, handleClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.price || !formData.quantity || !formData.category) {
      setErrorMsg("দয়া করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন।");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const token = localStorage.getItem("token"); // JWT token
      if (!token) throw new Error("Token নেই, অনুগ্রহ করে লগইন করুন।");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const res = await axios.post("http://localhost:5000/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setSuccessMsg("পণ্য সফলভাবে যোগ হয়েছে!");
        setFormData({
          title: "",
          category: "",
          price: "",
          quantity: "",
          description: "",
          image: null,
        });
        onProductAdded(res.data.product); // parent component কে জানানো
      } else {
        setErrorMsg(res.data.message || "পণ্য যোগ করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || err.message || "পণ্য যোগ করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>নতুন পণ্য যোগ করুন</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>পণ্যের নাম *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="পণ্যের নাম লিখুন"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>ক্যাটাগরি *</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                  <option value="বীজ ও চারা">বীজ ও চারা</option>
                  <option value="যন্ত্রপাতি">যন্ত্রপাতি</option>
                  <option value="খাদ্য ও সার">খাদ্য ও সার</option>
                  <option value="মৎস্য চাষ">মৎস্য চাষ</option>
                  <option value="ঔষধ ও ভ্যাকসিন">ঔষধ ও ভ্যাকসিন</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>মূল্য (টাকা) *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="মূল্য লিখুন"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="quantity">
                <Form.Label>পরিমাণ *</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="পরিমাণ লিখুন"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>বর্ণনা</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="পণ্যের বিস্তারিত লিখুন"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>ছবি আপলোড করুন</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </Form.Group>

          <div className="text-end d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              বন্ধ করুন
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  সাবমিট হচ্ছে...
                </>
              ) : (
                "সাবমিট করুন"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProducts;
