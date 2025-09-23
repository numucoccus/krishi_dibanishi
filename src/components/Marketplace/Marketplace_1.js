import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Tab, Nav, Badge, Form, Modal } from "react-bootstrap";
import './Marketplace_2.css';
import { io } from "socket.io-client";
import AddProducts from "./AddProducts";
import axios from "../../api";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

// ==================== Role Labels ====================
const roleLabels = {
  Farmer: "কৃষক",
  Expert: "কৃষি বিশেষজ্ঞ",
  Coordinator: "স্থানীয় সমন্বয়কারী",
  Entrepreneur: "স্টার্টআপ উদ্যোক্তা",
  Supplier: "সরবরাহকারী",
  Investor: "বিনিয়োগকারী",
};

// ==================== SupplierDashboard Component ====================
const SupplierDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(storedUser || {});
  const [showAdd, setShowAdd] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [productsState, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddProductClick = () => setShowAdd(true);
  const handleClose = () => setShowAdd(false);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Navigate to login page
    navigate('/login', { replace: true });
  };

  // Check if current path is market to apply active styling
  const isMarketActive = location.pathname === '/market';

  const handleProductAdded = (newProduct) => {
    if (newProduct) {
      setProductsList(prev => Array.isArray(prev) ? [newProduct, ...prev] : [newProduct]);
      socket.emit("new-product", newProduct);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/home">
            BD <span className="text-dark">কৃষি দিবানিশি</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#MarketplaceNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="MarketplaceNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/home">হোম</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">ড্যাশবোর্ড</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/community">কমিউনিটি</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/resources">রিসোর্স</Link></li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isMarketActive ? 'active text-success fw-bold' : ''}`} 
                  to="/market" 
                  state={{ supplierView: true }}
                >
                  বাজার
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-success me-2">
                {roleLabels[user?.role] || "ইউজার"}
              </button>
              {/* Logout Button */}
              <button 
                className="btn btn-outline-danger" 
                onClick={handleLogout}
              >
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="marketplace-section">
        <Container>
          <div className="marketplace-header text-center mb-5">
            <h2 className="fw-bold">কৃষি দিবানিশি মার্কেটপ্লেস</h2>
            <p className="text-muted">Krishi Dibanishi Marketplace</p>
          </div>

          <Row className="g-4">
            {/* পণ্য বিক্রয় করুন */}
            <Col md={4}>
              <Card className="supplier-card">
                <h5>📦 পণ্য বিক্রয় করুন</h5>
                <p>আপনার সকল তালিকাভুক্ত পণ্য দেখুন, ম্যানেজ করুন এবং নতুন পণ্য যোগ করুন।</p>
                <div className="d-flex flex-column gap-2">
                  <Button variant="success" onClick={handleAddProductClick}>➕ নতুন পণ্য যোগ করুন</Button>
                  <AddProducts show={showAdd} handleClose={handleClose} onProductAdded={handleProductAdded} />
                  <div>
                    {productsList.map(p => (
                      <div key={p._id}>{p.title} - {p.price} টাকা</div>
                    ))}
                  </div>
                  <Button variant="outline-primary">📋 সব পণ্য দেখুন</Button>
                </div>
              </Card>
            </Col>

            {/* অর্ডারসমূহ */}
            <Col md={4}>
              <Card className="supplier-card">
                <h5>🛒 অর্ডারসমূহ</h5>
                <p>আপনার সকল অর্ডার ট্র্যাক করুন এবং ডেলিভারি স্ট্যাটাস আপডেট করুন।</p>
                <div className="d-flex flex-column gap-2">
                  <Button variant="success">📦 নতুন অর্ডার দেখুন</Button>
                  <Button variant="outline-primary">📊 অর্ডার হিস্ট্রি</Button>
                </div>
              </Card>
            </Col>

            {/* নোটিফিকেশন */}
            <Col md={4}>
              <Card className="supplier-card">
                <h5>🔔 নোটিফিকেশন</h5>
                <p>নতুন অর্ডার, গ্রাহকের মেসেজ এবং সিস্টেম আপডেট সম্পর্কে জানুন।</p>
                <div className="d-flex flex-column gap-2">
                  <Button variant="success">📨 ইনবক্স দেখুন</Button>
                  <Button variant="outline-primary">⚙️ সেটিংস</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

// ==================== Marketplace Data ====================
const categories = [
  { icon: "🌾", title: "বীজ ও চারা", subtitle: "Seeds & Seedlings", count: "২৩৪ পণ্য" },
  { icon: "🚜", title: "যন্ত্রপাতি", subtitle: "Equipment", count: "১৮৯ পণ্য" },
  { icon: "🐄", title: "খাদ্য ও সার", subtitle: "Feed & Fertilizer", count: "১৫৬ পণ্য" },
  { icon: "💉", title: "ঔষধ ও ভ্যাকসিন", subtitle: "Medicine & Vaccines", count: "৯৮ পণ্য" },
];

const TrendingNow = () => (
  <div className="mt-5">
    <Card className="p-4">
      <h5 className="fw-bold mb-3 text-success">📈 এই মুহূর্তে জনপ্রিয়</h5>
      <p className="text-muted">সবচেয়ে বেশি খোঁজা পণ্যসমূহ</p>
      <ul className="list-unstyled mb-0">
        {[
          "ব্রি ধান২৯ বীজ",
          "তেলাপিয়া পোনা",
          "ইউরিয়া সার",
          "পাওয়ার টিলার",
          "গাভীর খাদ্য",
        ].map((item, index) => (
          <li
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            #{index + 1} {item}
            <span className="text-success">📈</span>
          </li>
        ))}
      </ul>
    </Card>
  </div>
);

const specialOffers = [
  {
    title: "মৌসুমী ছাড়",
    description: "সব ধরনের বীজে ২০% পর্যন্ত ছাড়",
    validity: "বৈধতা: ৩১ জানুয়ারি পর্যন্ত",
    code: "WINTER20",
  },
  {
    title: "বাল্ক অর্ডারের ছাড়",
    description: "১০,০০০ টাকার বেশি কেনাকাটায় ১৫% ছাড়",
    validity: "বৈধতা: ১৫ ফেব্রুয়ারি পর্যন্ত",
    code: "BULK15",
  },
];

const services = [
  {
    icon: "🚚",
    title: "হোম ডেলিভারি",
    desc: "আপনার দোরগোড়ায় পণ্য পৌঁছে দেওয়ার সেবা। ঢাকা শহরে ২৪ ঘণ্টায়, সারাদেশে ৩-৫ দিনে।",
    price: "৫০ টাকা থেকে শুরু",
    btnText: "অর্ডার করুন",
    btnDisabled: false,
  },
  {
    icon: "👨‍⚕️",
    title: "পশু চিকিৎসা সেবা",
    desc: "অভিজ্ঞ ভেটেরিনারি ডাক্তারদের কাছ থেকে পশু চিকিৎসা সেবা। জরুরি অবস্থায় ২৪/৭ সেবা।",
    price: "৫০০ টাকা থেকে শুরু",
    btnText: "ডাক্তার ডাকুন",
    btnDisabled: false,
  },
  {
    icon: "🔧",
    title: "যন্ত্রপাতি মেরামত",
    desc: "কৃষি যন্ত্রপাতি মেরামত ও রক্ষণাবেক্ষণ সেবা। দক্ষ টেকনিশিয়ান ও আসল যন্ত্রাংশ।",
    price: "সেম ডে সার্ভিস",
    btnText: "সেবা নিন",
    btnDisabled: false,
  },
];

const Marketplace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [supplierView, setSupplierView] = useState(false);
  const [productsState, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleClose = () => setSelectedProduct(null);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Navigate to login page
    navigate('/login');
  };

  // Check if current path is market to apply active styling
  const isMarketActive = location.pathname === '/market';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Socket.io new-product 
  useEffect(() => {
    socket.on("new-product", (product) => {
      if (product) {
        setProducts(prev => Array.isArray(prev) ? [product, ...prev] : [product]);
      }
    });
    return () => socket.off("new-product");
  }, []);

  // ✅ Supplier view check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (location.state?.supplierView) {
      setSupplierView(true);
    } else if (user?.role?.toLowerCase() === "supplier") {
      setSupplierView(true);
    } else {
      setSupplierView(false);
    }
  }, [location.state]);

  // ✅ Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        setVisibleProducts(prev => Math.min(prev + 1, productsState.length));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [productsState]);

  if (supplierView) return <SupplierDashboard />;

  // ==================== Normal Marketplace UI ====================
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/home">
            BD <span className="text-dark">কৃষি দিবানিশি</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#MarketplaceNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="MarketplaceNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/home">হোম</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">ড্যাশবোর্ড</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/community">কমিউনিটি</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/resources">রিসোর্স</Link></li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isMarketActive ? 'active text-success fw-bold' : ''}`} 
                  to="/market"
                >
                  বাজার
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-success me-2">
                {roleLabels[storedUser?.role] || "ইউজার"}
              </button>
              {/* Logout Button */}
              <button 
                className="btn btn-outline-danger" 
                onClick={handleLogout}
              >
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Marketplace Section */}
      <div className="marketplace-section">
        <Container>
          <div className="marketplace-header text-center mb-5">
            <h2 className="fw-bold">কৃষি দিবানিশি মার্কেটপ্লেস</h2>
            <p className="text-muted">Krishi Dibanishi Marketplace</p>
            <p className="text-muted fs-6 mx-auto" style={{ maxWidth: "600px" }}>
              কৃষি, মৎস্য ও প্রাণিসম্পদের জন্য প্রয়োজনীয় সকল পণ্য ও সেবা এক
              জায়গায়। বিশ্বস্ত বিক্রেতা ও সাশ্রয়ী মূল্য।
            </p>
          </div>

          <Row className="mb-4 justify-content-center align-items-center">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="পণ্য, বীজ, যন্ত্রপাতি বা সেবা খুঁজুন..."
                className="search-input"
              />
            </Col>
            <Col md="auto" className="d-flex gap-2">
              <Button variant="outline-secondary" className="btn-filter">
                ফিল্টার
              </Button>
              <Button variant="outline-secondary" className="btn-location">
                এলাকা
              </Button>
            </Col>
          </Row>

          <Row className="g-4 text-center mb-5">
            {categories.map(({ icon, title, subtitle, count }, idx) => (
              <Col md={3} key={idx}>
                <Card className="category-card">
                  <div className="icon">{icon}</div>
                  <h5>{title}</h5>
                  <p>{subtitle}</p>
                  <Badge bg="light" text="muted" className="count-badge">
                    {count}
                  </Badge>
                </Card>
              </Col>
            ))}
          </Row>

          <h4 className="mb-3 fw-bold">বিশেষ অফার</h4>
          <Row className="mb-4">
            {specialOffers.map(({ title, description, validity, code }, idx) => (
              <Col md={6} key={idx}>
                <Card className="special-offer-card p-3">
                  <h5>{title}</h5>
                  <p>{description}</p>
                  <small className="text-muted">
                    {validity} | কোড: <code>{code}</code>
                  </small>
                  <Button variant="warning" size="sm" className="btn-offer mt-3">
                    অফার পান
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Products & Services */}
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Nav variant="tabs" className="marketplace-tabs mb-4 justify-content-center">
              <Nav.Item><Nav.Link eventKey="products">পণ্যসমূহ</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="services">সেবাসমূহ</Nav.Link></Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <Row className="g-3">
                  {productsState.slice(0, visibleProducts).map((p, idx) => (
                    <Col md={4} key={idx}>
                      <Card
                        className="product-card p-3 hover-card"
                        onClick={() => setSelectedProduct(p)}
                      >
                        <h5>{p.title}</h5>
                        <p>{p.price} টাকা</p>
                        <small>{p.unit}</small>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Product Detail Modal */}
                {selectedProduct && (
                  <Modal show={true} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>{selectedProduct.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p><strong>মূল্য:</strong> {selectedProduct.price} টাকা</p>
                      <p><strong>একক:</strong> {selectedProduct.unit}</p>
                      <p><strong>বিবরণ:</strong> {selectedProduct.desc || "বিস্তারিত তথ্য নেই।"}</p>

                      {/* Supplier Information */}
                      {selectedProduct.supplier && (
                        <>
                          <hr />
                          <h6>সরবরাহকারী তথ্য</h6>
                          <p><strong>Username:</strong> {selectedProduct.supplier.username}</p>
                          <p><strong>ফোন:</strong> {selectedProduct.supplier.phone}</p>
                          <p><strong>অবস্থান:</strong> {selectedProduct.supplier.location}</p>
                        </>
                      )}
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={handleClose}>
                        বন্ধ করুন
                      </Button>
                      <Button variant="success">
                        🛒 কিনুন
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="services">
                <div className="mt-5"></div>
                <h4 className="services-heading">উপলব্ধ সেবাসমূহ</h4>
                <div className="services-grid">
                  {services.map((service, index) => (
                    <div 
                      key={index} 
                      className={`service-card ${index < 3 ? 'pani-bg' : ''}`}
                    >
                      <div className="icon">{service.icon}</div>
                      <h5>{service.title}</h5>
                      <p>{service.desc}</p>
                      <div className="service-price">{service.price}</div>
                      <Button 
                        variant="success" 
                        size="sm" 
                        disabled={service.btnDisabled}
                      >
                        {service.btnText}
                      </Button>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <TrendingNow />
        </Container>
      </div>
    </>
  );
};

export default Marketplace;