import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Tab, Nav, Badge,Form } from "react-bootstrap";
import './Marketplace_2.css';
import { io } from "socket.io-client";
import AddProducts from "./AddProducts";
import axios from "../../api";
const socket = io("http://localhost:5000");


// ==================== SupplierDashboard Component ====================
const SupplierDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
const [user, setUser] = useState(storedUser || {}); 
const [showAdd, setShowAdd] = useState(false);
const [productsList, setProductsList] = useState([]); // Optional: supplier products দেখানোর জন্য

const handleAddProductClick = () => setShowAdd(true);
const handleClose = () => setShowAdd(false);

const handleProductAdded = (newProduct) => {
  setProductsList(prev => [newProduct, ...prev]);
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
  <li className="nav-item">
    <Link className="nav-link" to="/home">হোম</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/dashboard">ড্যাশবোর্ড</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/community">কমিউনিটি</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/resources">রিসোর্স</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/market" state={{ supplierView: true }}>
      বাজার
    </Link>
  </li>
</ul>
         <div className="d-flex">
            <button className="btn btn-success me-2">কৃষক</button>
          </div>
        </div>
      </div>
     </nav>

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

        <Row className="g-4">

  {/* পণ্য বিক্রয় করুন */}
  <Col md={4}>
    <Card className="supplier-card">
      <h5>📦 পণ্য বিক্রয় করুন</h5>
      <p>আপনার সকল তালিকাভুক্ত পণ্য দেখুন, ম্যানেজ করুন এবং নতুন পণ্য যোগ করুন।</p>
      <div className="d-flex flex-column gap-2">
        <Button variant="success" onClick={handleAddProductClick}>➕ নতুন পণ্য যোগ করুন</Button>
          <AddProducts
  show={showAdd}
  handleClose={handleClose}
  onProductAdded={handleProductAdded}
/>
  {/* Optional: productsList দেখানোর জন্য */}
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
          <li key={index} className="d-flex justify-content-between align-items-center">
            #{index + 1} {item} <span className="text-success">📈</span>
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

const products = [
  {
    category: "বীজ ও চারা",
    tag: "সেরা বিক্রেতা",
    discountPercent: 15,
    discountTag: "ছাড়",
    title: "ব্রি ধান২৯ উচ্চ ফলনশীল বীজ",
    subtitle: "BRRI Dhan29 High Yield Seeds",
    desc: "বাংলাদেশে উৎপাদিত সর্বোচ্চ মানের ব্রি ধান২৯ বীজ, উচ্চ ফলনশীল ও রোগ প্রতিরোধী",
    location:"কৃষি বীজ ভবন, গাজীপুর, ঢাকা",
    stock: true,
    price: 85,
    originalPrice: 100,
    unit: "প্রতি কেজি",
    rating: 4.8,
    ratingCount: 156,
  },
  {
    category: "মৎস্য চাষ",
    tag: "প্রিমিয়াম",
    discountPercent: 0,
    discountTag: "",
    title: "তেলাপিয়া মাছের পোনা (৩-৪ ইঞ্চি)",
    subtitle: "Tilapia Fish Fry (3-4 inches)",
    desc: "স্বাস্থ্যবান ও দ্রুত বর্ধনশীল তেলাপিয়া পোনা, গ্যারান্টিসহ সরবরাহ",
    location: "সুন্দরবন মৎস্য খামার, খুলনা",
    stock: true,
    price: 25,
    originalPrice: 0,
    unit: "প্রতি ১০০টি",
    rating: 4.9,
    ratingCount: 89,
  },
  {
    category: "খাদ্য ও সার",
    tag: "জনপ্রিয়",
    discountPercent: 7,
    discountTag: "ছাড়",
    title: "গাভীর জন্য সুষম খাদ্য (৫০ কেজি)",
    subtitle: "Balanced Cattle Feed (50kg)",
    desc: "গাভীর দুধ উৎপাদন বৃদ্ধির জন্য বিশেষভাবে প্রস্তুতকৃত পুষ্টিকর খাদ্য",
    location: "প্রাণ এগ্রো লিমিটেড, নারায়ণগঞ্জ, ঢাকা",
    stock: true,
    price: 1850,
    originalPrice: 2000,
    unit: "প্রতি বস্তা",
    rating: 4.7,
    ratingCount: 234,
  },
{
    category1: "খাদ্য ও সার",
    tag: "নতুন",
    discountPercent: 0,
    discountTag: "",
    title: "ব্রয়লার স্টার্টার ফিড (২৫ কেজি)",
    subtitle: "Broiler Starter Feed (25kg)",
    desc: "ব্রয়লার মুরগির প্রথম ৩ সপ্তাহের জন্য বিশেষ প্রযুক্তির স্টার্টার ফিড",
    location: "কিউএইচএস পোল্ট্রি, কুমিল্লা",
    stock: true,
    price: 1450,
    originalPrice: 0,
    unit: "প্রতি বস্তা",
    rating: 4.6,
    ratingCount: 167,
  },
  {
    category: "যন্ত্রপাতি",
    tag: "গ্যারান্টি",
    discountTaka: 10000,
    discountTag: "টাকা ছাড়",
    title: "পাওয়ার টিলার (১২ এইচপি)",
    subtitle: "Power Tiller (12 HP)",
    desc: "ইয়ানমার ইঞ্জিনসহ উচ্চ মানের পাওয়ার টিলার, ৩ বছরের গ্যারান্টি ও ফ্রি সার্ভিস",
    location: "বাংলাদেশ কৃষি যন্ত্র, বগুড়া",
    stock: true,
    price: 125000,
    originalPrice: 135000,
    unit: "প্রতিটি",
    rating: 4.5,
    ratingCount: 45,
  },
  {
    category: "যন্ত্রপাতি",
    tag: "বেস্ট সেলার",
    discountTaka: 3500,
    discountTag: "টাকা ছাড়",
    title: "এরোটর মেশিন (মাছের পুকুরের জন্য)",
    subtitle: "Aerator Machine (For Fish Pond)",
    desc: "মাছের পুকুরে অক্সিজেন সরবরাহের জন্য উন্নত প্রযুক্তির এরোটর, কম বিদ্যুৎ খরচ",
    location: "আকুয়া টেক সলিউশন, ময়মনসিংহ",
    stock: true,
    price: 18500,
    originalPrice: 22000,
    unit: "প্রতিটি",
    rating: 4.8,
    ratingCount: 67,
  },
];


const Marketplace = (props) => {
  const location = useLocation();
  const [supplierView, setSupplierView] = useState(false);
  const [productsState, setProducts] = useState(products); 
  const [activeTab, setActiveTab] = useState("products");
  const [visibleProducts, setVisibleProducts] = useState(6);


    useEffect(() => {
  socket.on("new-product", (product) => {
    setProducts(prev => [product, ...prev]);
  });

  return () => socket.off("new-product");
}, []);



  // Update supplierView based on user or location.state changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (location.state?.supplierView) {
      setSupplierView(true);
    } else if (user?.role?.toLowerCase() === "supplier") {
      setSupplierView(true);
    } else {
      setSupplierView(false);
    }
  }, [location.state]); // location.state change এ re-evaluate হবে





useEffect(() => {
  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
      setVisibleProducts(prev => Math.min(prev + 1, productsState.length));
    }
  };
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, [productsState]);


   // ==================== Supplier View ====================
  if (supplierView) return <SupplierDashboard />;


  // ==================== Normal Marketplace UI ====================
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
            <li className="nav-item">
              <Link className="nav-link" to="/home">হোম</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">ড্যাশবোর্ড</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/community">কমিউনিটি</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resources">রিসোর্স</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/market">বাজার</Link>
            </li>
          </ul>

          <div className="d-flex">
            <button className="btn btn-success me-2">কৃষক</button>
          </div>
        </div>
      </div>
     </nav>


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

        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Nav variant="tabs" className="marketplace-tabs mb-4 justify-content-center">
            <Nav.Item><Nav.Link eventKey="products">পণ্যসমূহ</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="services">সেবাসমূহ</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="products">
              <div className="mt-5">
                <h4 className="services-heading">জনপ্রিয় পণ্য</h4>
                <Row className="g-3">
                  {productsState.slice(0, visibleProducts).map((p, idx) => (
                    <Col md={4} key={idx}>
                      <Card className="product-card">
                        <Row className="align-items-center g-3">
                          <Col md={2} className="product-icon">
                            {p.category === "বীজ ও চারা" && "🌾"}
                            {p.category === "মৎস্য চাষ" && "🐟"}
                            {p.category === "খাদ্য ও সার" && "🐄"}
                            {p.category1 === "খাদ্য ও সার" && "🐔"}
                            {p.category === "যন্ত্রপাতি" && "🚜"}
                            {p.category === "ঔষধ ও ভ্যাকসিন" && "💉"}
                          </Col>
                          <Col md={10}>
                            <div className="badge-container d-flex flex-column align-items-end gap-1 mb-2" style={{ minHeight: '40px' }}>
                              {p.tag && (
                                <Badge bg={p.tag === "প্রিমিয়াম" ? "dark" : "light"} text={p.tag === "প্রিমিয়াম" ? "light" : "dark"} className="fw-semibold border">
                                  {p.tag}
                                </Badge>
                              )}
                              {p.discountPercent > 0 && (
                                <Badge bg="danger" className="fw-semibold">
                                  {p.discountPercent}% ছাড়
                                </Badge>
                              )}
                              {p.discountTaka > 0 && (
                                <Badge bg="danger" className="fw-semibold">
                                  {p.discountTaka} টাকা ছাড়
                                </Badge>
                              )}
                            </div>
                            <div className="mb-2">
                              <Badge bg="light" text="dark" className="fw-semibold border">
                                {p.category}
                              </Badge>
                             </div>
                            <div className="mb-2">
                              <Badge bg="light" text="dark" className="fw-semibold border">
                                {p.category1}
                              </Badge>
                            </div>
                            <h5 className="fw-semibold">{p.title}</h5>
                            <small className="text-muted fst-italic">{p.subtitle}</small>
                            <p className="my-2">{p.desc}</p>
                            <p className="price-section">
                              {p.price.toLocaleString()} টাকা
                              {p.originalPrice > 0 && (
                                <span className="original-price">
                                  <del>{p.originalPrice.toLocaleString()} টাকা</del>
                                </span>
                              )}
                            </p>
                            <p className="text-muted mb-1">{p.unit}</p>
                            <div className="rating">★ {p.rating} ({p.ratingCount})</div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <small className="text-muted">📍{p.location}</small>
                              <Badge bg="success" className="fw-semibold">স্টকে আছে</Badge>
                            </div>
                            <div className="d-flex gap-2 align-items-center">
                              <Button variant="success" size="sm" className="flex-grow-1">🛒  কার্টে যোগ করুন</Button>
                              <Button variant="outline-primary" size="sm">📞</Button>
                              <Button variant="outline-secondary" size="sm">💬</Button>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
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
                    <div className="service-icon">{service.icon}</div>
                    <h5 className="service-title">{service.title}</h5>
                    <p className="service-desc">{service.desc}</p>
                    <p className="service-price">
                      <span className="price-icon">{service.priceIcon}</span>
                      {service.price}
                    </p>
                    <button 
                      className={`btn-service ${service.btnDisabled ? 'disabled' : ''}`} 
                      disabled={service.btnDisabled}
                    >
                      {service.btnText}
                    </button>
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
