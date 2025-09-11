import './Marketplace_2.css';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, Tab, Nav } from "react-bootstrap";

const categories = [
  { icon: "🌾", title: "বীজ ও চারা", subtitle: "Seeds & Seedlings", count: "২৩৪ পণ্য" },
  { icon: "🚜", title: "যন্ত্রপাতি", subtitle: "Equipment", count: "১৮৯ পণ্য" },
  { icon: "🐄", title: "খাদ্য ও সার", subtitle: "Feed & Fertilizer", count: "১৫৬ পণ্য" },
  { icon: "💉", title: "ঔষধ ও ভ্যাকসিন", subtitle: "Medicine & Vaccines", count: "৯৮ পণ্য" },
];

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
    title: "গাভীর জন্য সুসম খাদ্য (৫০ কেজি)",
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
    category: "খাদ্য ও সার",
    tag: "নতুন",
    discountPercent: 0,
    discountTag: "",
    title: "ব্রয়লার স্টার্টার ফিড (২৫ কেজি)",
    subtitle: "Broiler Starter Feed (25kg)",
    desc: "ব্রয়লার মুরগির প্রথম ৩ সপ্তাহের জন্য বিশেষ প্রযুক্তির স্টার্টার ফিড",
    location: "কিউএফএস পোল্ট্রি, কুমিল্লা",
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
    discountPercent: 10000,
    discountTag: "টাকা ছাড়",
    title: "পাওয়ার টিলার (১২ এইচপি)",
    subtitle: "Power Tiller (12 HP)",
    desc: "ইয়ানমার ইঞ্জিনসহ উচ্চ মানের পাওয়ার টিলার, ৩ বছরের গ্যারান্টি ও ফ্রি সার্ভিস",
    location: "বাংলাদেশ কৃষি যন্ত্র, বগুড়া",
    stock: true,
    price: 125000,
    originalPrice: 135000,
    unit: "প্রতি টি",
    rating: 4.5,
    ratingCount: 45,
  },
  {
    category: "যন্ত্রপাতি",
    tag: "বেস্ট সেলার",
    discountPercent: 3500,
    discountTag: "টাকা ছাড়",
    title: "এরোটর মেশিন (মাছের পুকুরের জন্য)",
    subtitle: "Aerator Machine (For Fish Pond)",
    desc: "মাছের পুকুরে অক্সিজেন সরবরাহের জন্য উন্নত প্রযুক্তির এরোটর, কম বিদ্যুৎ খরচ",
    location: "আকুয়া টেক সলিউশন, ময়মনসিংহ",
    stock: true,
    price: 18500,
    originalPrice: 22000,
    unit: "প্রতি টি",
    rating: 4.8,
    ratingCount: 67,
  },
];

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setVisibleProducts((prev) =>
          Math.min(prev + 1, products.length)
        );
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
        </Row>

        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Nav variant="tabs" className="marketplace-tabs mb-4 justify-content-center">
            <Nav.Item><Nav.Link eventKey="products">পণ্যসমূহ</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="suppliers">সরবরাহকারী</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="services">সেবাসমূহ</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="products">
              <div className="mt-5"> 
                <h4 className="fw-bold mb-4">জনপ্রিয় পণ্য</h4>
                <Row className="g-3">
                  {products.slice(0, visibleProducts).map((p, idx) => (
                    <Col md={4} key={idx}>
                      <Card className="product-card">
                        <Row className="align-items-center g-3">
                          <Col md={2} className="product-icon">
                            {p.category === "বীজ ও চারা" && "🌾"}
                            {p.category === "মৎস্য চাষ" && "🐟"}
                            {p.category === "খাদ্য ও সার" && "🐄"}
                            {p.category === "যন্ত্রপাতি" && "🚜"}
                            {p.category === "ঔষধ ও ভ্যাকসিন" && "💉"}
                          </Col>
                          <Col md={10}> 
                          <div
                          className="badge-container d-flex flex-column align-items-end gap-1 mb-2"
                          style={{ minHeight: '40px' }} >
                          {p.tag && (
                          <Badge
                          bg={p.tag === "প্রিমিয়াম" ? "dark" : "light"}
                          text={p.tag === "প্রিমিয়াম" ? "light" : "dark"}
                          className="fw-semibold border" >
                          {p.tag}
                          </Badge>  )}
                          {p.discountPercent > 0 ? (
                          <Badge bg="danger" className="fw-semibold">
                          {p.discountPercent}% ছাড়
                          </Badge>
                           ) : (
                            null
                           )}
                          </div>
                          <div className="mb-2">
                          <Badge bg="light" text="dark" className="fw-semibold border">
                          {p.category}
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
                             <small className="text-muted">
                            📍{p.location}
                             </small>
                              <Badge bg="success" className="fw-semibold">
                              স্টকে আছে
                             </Badge>
                             </div>
                            <div className="d-flex gap-2 align-items-center">
                            <Button variant="success" size="sm" className="flex-grow-1">
                               কার্টে যোগ করুন
                            </Button>
                            <Button variant="outline-primary" size="sm">
                                📞
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                               💬
                            </Button>
                           </div>      
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div> {/* ✅ Closing tag added here */}
            </Tab.Pane>

            <Tab.Pane eventKey="suppliers">
              <p className="text-center text-muted">সরবরাহকারী তথ্য আসছে...</p>
            </Tab.Pane>

            <Tab.Pane eventKey="services">
              <p className="text-center text-muted">সেবা সম্পর্কিত তথ্য আসছে...</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Marketplace;
