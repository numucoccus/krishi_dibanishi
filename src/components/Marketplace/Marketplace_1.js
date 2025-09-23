import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Form, Modal } from "react-bootstrap";
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
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddProductClick = () => setShowAdd(true);
  const handleClose = () => setShowAdd(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login', { replace: true });
  };

  const isMarketActive = location.pathname === '/market';

  const handleProductAdded = (newProduct) => {
    if (newProduct) {
      setProductsList(prev => Array.isArray(prev) ? [newProduct, ...prev] : [newProduct]);
      socket.emit("new-product", newProduct);
    }
  };

  // Fetch supplier's products
  useEffect(() => {
    const fetchSupplierProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/products", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setProductsList(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user?.role?.toLowerCase() === "supplier") {
      fetchSupplierProducts();
    }
  }, [user]);

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
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="marketplace-section">
        <Container>
          <div className="marketplace-header text-center mb-5">
            <h2 className="fw-bold">সরবরাহকারী ড্যাশবোর্ড</h2>
            <p className="text-muted">Supplier Dashboard</p>
          </div>

          <Row className="g-4">
            {/* পণ্য বিক্রয় করুন */}
            <Col md={6}>
              <Card className="supplier-card h-100">
                <div className="text-center">
                  <div className="supplier-icon">📦</div>
                  <h5>পণ্য ব্যবস্থাপনা</h5>
                  <p>আপনার সকল তালিকাভুক্ত পণ্য দেখুন, ম্যানেজ করুন এবং নতুন পণ্য যোগ করুন।</p>
                </div>
                <div className="d-flex flex-column gap-2 mt-3">
                  <Button variant="success" onClick={handleAddProductClick}>
                    ➕ নতুন পণ্য যোগ করুন
                  </Button>
                  <AddProducts show={showAdd} handleClose={handleClose} onProductAdded={handleProductAdded} />
                  <Button variant="outline-primary">
                    📋 আমার পণ্য ({productsList.length})
                  </Button>
                </div>
                {productsList.length > 0 && (
                  <div className="mt-3">
                    <small className="text-muted">সর্বশেষ যোগকৃত: {productsList[0]?.title}</small>
                  </div>
                )}
              </Card>
            </Col>

            {/* অর্ডারসমূহ */}
            <Col md={6}>
              <Card className="supplier-card h-100">
                <div className="text-center">
                  <div className="supplier-icon">🛒</div>
                  <h5>অর্ডার ব্যবস্থাপনা</h5>
                  <p>আপনার সকল অর্ডার ট্র্যাক করুন এবং ডেলিভারি স্ট্যাটাস আপডেট করুন।</p>
                </div>
                <div className="d-flex flex-column gap-2 mt-3">
                  <Button variant="success">
                    📦 নতুন অর্ডার দেখুন ({orders.length})
                  </Button>
                  <Button variant="outline-primary">
                    📊 অর্ডার হিস্ট্রি
                  </Button>
                </div>
                {orders.length === 0 && (
                  <div className="mt-3">
                    <small className="text-muted">কোন নতুন অর্ডার নেই</small>
                  </div>
                )}
              </Card>
            </Col>
          </Row>

          {/* Recent Products Preview */}
          {productsList.length > 0 && (
            <Row className="mt-5">
              <Col>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">আপনার সর্বশেষ পণ্যসমূহ</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      {productsList.slice(0, 3).map((product, index) => (
                        <Col md={4} key={index}>
                          <Card className="product-preview-card">
                            <Card.Body>
                              <h6>{product.title}</h6>
                              <p className="text-success mb-1">{product.price} টাকা</p>
                              <small className="text-muted">পরিমাণ: {product.quantity}</small>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

// ==================== Marketplace Component ====================
const Marketplace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [supplierView, setSupplierView] = useState(false);
  const [productsState, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(9);

  const handleClose = () => setSelectedProduct(null);
  const handleShowMore = () => setVisibleProducts(prev => prev + 6);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  const isMarketActive = location.pathname === '/market';

  // Fetch products
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

  // Socket.io for real-time updates
  useEffect(() => {
    socket.on("new-product", (product) => {
      if (product) {
        setProducts(prev => Array.isArray(prev) ? [product, ...prev] : [product]);
      }
    });
    return () => socket.off("new-product");
  }, []);

  // Supplier view check
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

  // Filter products
  const filteredProducts = activeFilter === "all" 
    ? productsState 
    : productsState.filter(product => product.category === activeFilter);

  // Category counts
  const categoryCounts = {
    'all': productsState.length,
    'বীজ ও চারা': productsState.filter(p => p.category === 'বীজ ও চারা').length,
    'যন্ত্রপাতি': productsState.filter(p => p.category === 'যন্ত্রপাতি').length,
    'খাদ্য ও সার': productsState.filter(p => p.category === 'খাদ্য ও সার').length,
    'ঔষধ ও ভ্যাকসিন': productsState.filter(p => p.category === 'ঔষধ ও ভ্যাকসিন').length,
  };

  const categories = [
    { icon: "🌾", title: "বীজ ও চারা", value: "বীজ ও চারা" },
    { icon: "🚜", title: "যন্ত্রপাতি", value: "যন্ত্রপাতি" },
    { icon: "🐄", title: "খাদ্য ও সার", value: "খাদ্য ও সার" },
    { icon: "💉", title: "ঔষধ ও ভ্যাকসিন", value: "ঔষধ ও ভ্যাকসিন" },
  ];

  if (supplierView) return <SupplierDashboard />;

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
              <button className="btn btn-outline-danger" onClick={handleLogout}>
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
              কৃষি, মৎস্য ও প্রাণিসম্পদের জন্য প্রয়োজনীয় সকল পণ্য এক জায়গায়। বিশ্বস্ত সরবরাহকারী ও সাশ্রয়ী মূল্য।
            </p>
          </div>

          {/* Category Filters */}
          <Row className="mb-4 justify-content-center">
            <Col md={10}>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <Button 
                  variant={activeFilter === 'all' ? 'success' : 'outline-success'} 
                  onClick={() => setActiveFilter('all')}
                  className="filter-btn"
                >
                  সব পণ্য ({categoryCounts.all})
                </Button>
                {categories.map((category, index) => (
                  <Button 
                    key={index}
                    variant={activeFilter === category.value ? 'success' : 'outline-success'} 
                    onClick={() => setActiveFilter(category.value)}
                    className="filter-btn"
                  >
                    {category.icon} {category.title} ({categoryCounts[category.value]})
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          {/* Category Overview */}
          <Row className="g-4 text-center mb-5">
            {categories.map(({ icon, title, value }, idx) => (
              <Col md={3} key={idx}>
                <Card className="category-card">
                  <div className="category-icon">{icon}</div>
                  <h5>{title}</h5>
                  <Badge bg="light" text="dark" className="count-badge">
                    {categoryCounts[value]} পণ্য
                  </Badge>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Products Grid */}
          <div className="products-section">
            <h4 className="mb-4 fw-bold text-center">
              {activeFilter === 'all' ? 'সকল পণ্য' : `${activeFilter} - পণ্যসমূহ`}
            </h4>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-5">
                <div className="empty-state">
                  <div style={{ fontSize: '4rem' }}>🛒</div>
                  <h5 className="mt-3">কোন পণ্য পাওয়া যায়নি</h5>
                  <p className="text-muted">এই বিভাগে এখনো কোন পণ্য যোগ করা হয়নি</p>
                </div>
              </div>
            ) : (
              <>
                <Row className="g-4">
                  {filteredProducts.slice(0, visibleProducts).map((product, idx) => (
                    <Col md={4} key={idx}>
                      <Card 
                        className="product-card h-100" 
                        onClick={() => setSelectedProduct(product)}
                      >
                        {/* Product Image */}
                        <div className="product-image-container">
                          {product.image ? (
                            <img 
                              src={`http://localhost:5000/uploads/${product.image}`} 
                              alt={product.title}
                              className="product-image"
                            />
                          ) : (
                            <div className="product-placeholder">
                              🛒
                            </div>
                          )}
                        </div>
                        
                        <Card.Body className="d-flex flex-column">
                          {/* Product Category */}
                          <Badge bg="success" className="align-self-start mb-2">
                            {product.category}
                          </Badge>
                          
                          {/* Product Title */}
                          <h6 className="product-title">{product.title}</h6>
                          
                          {/* Product Description */}
                          <p className="product-description">
                            {product.description || 'বিস্তারিত বিবরণ নেই'}
                          </p>
                          
                          {/* Price and Quantity */}
                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h5 className="product-price text-success mb-0">
                                {product.price} টাকা
                              </h5>
                              <Badge bg="outline-secondary" className="quantity-badge">
                                {product.quantity} ইউনিট
                              </Badge>
                            </div>
                            
                            {/* Supplier Info */}
                            {product.supplierId && (
                              <div className="supplier-info">
                                <small className="text-muted">
                                  সরবরাহকারী: {product.supplierId.name}
                                </small>
                              </div>
                            )}
                            
                            <Button variant="outline-success" size="sm" className="w-100">
                              বিস্তারিত দেখুন
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Load More Button */}
                {visibleProducts < filteredProducts.length && (
                  <div className="text-center mt-4">
                    <Button variant="success" onClick={handleShowMore}>
                      আরও পণ্য দেখুন ({filteredProducts.length - visibleProducts}টি বাকি)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal show={true} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                {selectedProduct.image ? (
                  <img 
                    src={`http://localhost:5000/uploads/${selectedProduct.image}`} 
                    alt={selectedProduct.title}
                    className="img-fluid rounded"
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="text-center py-4 bg-light rounded">
                    <div style={{ fontSize: '4rem' }}>🛒</div>
                    <p className="text-muted">ছবি নেই</p>
                  </div>
                )}
              </Col>
              <Col md={6}>
                <Badge bg="success" className="mb-3">{selectedProduct.category}</Badge>
                <h4 className="mb-3">{selectedProduct.title}</h4>
                
                <div className="product-details">
                  <p><strong>মূল্য:</strong> <span className="text-success fs-5">{selectedProduct.price} টাকা</span></p>
                  <p><strong>পরিমাণ:</strong> {selectedProduct.quantity} ইউনিট</p>
                  <p><strong>বিবরণ:</strong> {selectedProduct.description || "বিস্তারিত তথ্য নেই।"}</p>
                </div>
                
                {/* Supplier Information */}
                {selectedProduct.supplierId && (
                  <>
                    <hr />
                    <h6>সরবরাহকারী তথ্য</h6>
                    <div className="supplier-details">
                      <p><strong>নাম:</strong> {selectedProduct.supplierId.name}</p>
                      <p><strong>ইমেইল:</strong> {selectedProduct.supplierId.email}</p>
                      <p><strong>ফোন:</strong> {selectedProduct.supplierId.mobile || 'নেই'}</p>
                      <p><strong>অবস্থান:</strong> {selectedProduct.supplierId.district || 'নেই'}</p>
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              বন্ধ করুন
            </Button>
            <Button variant="success" size="lg">
              🛒 অর্ডার করুন
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Marketplace;