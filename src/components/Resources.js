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
             {/* Dashboard Navbar (Edited to match Home Page Navbar) */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
              <div className="container">
                <Link className="navbar-brand fw-bold text-success" to="/home">
                  BD <span className="text-dark">কৃষি দিবানিশি</span>
                </Link>
            
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse justify-content-between" id="dashboardNavbar">
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
                        <h4 className="fw-bold mb-4">আমাদের বিশেষজ্ঞ প্রশিক্ষকবৃন্দ</h4>
                        <Row className="g-4">
                            {/* Expert 1 */}
                            <Col md={6}>
                                <Card className="p-3 h-100 shadow-sm">
                                    <div className="d-flex align-items-start gap-3">
                                        <div
                                            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                                            style={{ width: '50px', height: '50px', backgroundColor: '#C0EFC0' }}
                                        >
                                            ম
                                        </div>
                                        <div>
                                            <h6 className="fw-bold">ড. মোহাম্মদ আলী</h6>
                                            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                                                ধান ও গম গবেষণা <br />
                                                বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট
                                            </p>
                                            <div className="d-flex flex-wrap gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                                                <span>অভিজ্ঞতা: ১৮ বছর</span>
                                                <span>কোর্স: ১২টি</span>
                                                <span>শিক্ষার্থী: 4560+</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-1">
                                                <span className="text-warning me-1">★</span> 4.9
                                            </div>
                                            <Button variant="outline-secondary" size="sm" className="mt-2">ফসল বিভাগ</Button>
                                        </div>
                                    </div>
                                    <Form.Control
                                        type="text"
                                        className="mt-3"
                                        placeholder="প্রোফাইল দেখুন"
                                        readOnly
                                    />
                                </Card>
                            </Col>

                            {/* Expert 2 */}
                            <Col md={6}>
                                <Card className="p-3 h-100 shadow-sm">
                                    <div className="d-flex align-items-start gap-3">
                                        <div
                                            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                                            style={{ width: '50px', height: '50px', backgroundColor: '#C0EFC0' }}
                                        >
                                            স
                                        </div>
                                        <div>
                                            <h6 className="fw-bold">প্রফেসর সালামা খাতুন</h6>
                                            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                                                মৎস্য উৎপাদন ও চাষ <br />
                                                বাংলাদেশ কৃষি বিশ্ববিদ্যালয়
                                            </p>
                                            <div className="d-flex flex-wrap gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                                                <span>অভিজ্ঞতা: ২২ বছর</span>
                                                <span>কোর্স: ৮টি</span>
                                                <span>শিক্ষার্থী: 3240+</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-1">
                                                <span className="text-warning me-1">★</span> 4.8
                                            </div>
                                            <Button variant="outline-secondary" size="sm" className="mt-2">মাছ চাষ</Button>
                                        </div>
                                    </div>
                                    <Form.Control
                                        type="text"
                                        className="mt-3"
                                        placeholder="প্রোফাইল দেখুন"
                                        readOnly
                                    />
                                </Card>
                            </Col>

                            {/* Expert 3 */}
                            <Col md={6}>
                                <Card className="p-3 h-100 shadow-sm">
                                    <div className="d-flex align-items-start gap-3">
                                        <div
                                            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                                            style={{ width: '50px', height: '50px', backgroundColor: '#C0EFC0' }}
                                        >
                                            র
                                        </div>
                                        <div>
                                            <h6 className="fw-bold">ডা. রবিউল ইসলাম</h6>
                                            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                                                গবাদিপশু চিকিৎসা ও পুষ্টি <br />
                                                চট্টগ্রাম ভেটেরিনারি কলেজ
                                            </p>
                                            <div className="d-flex flex-wrap gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                                                <span>অভিজ্ঞতা: ১৫ বছর</span>
                                                <span>কোর্স: ৬টি</span>
                                                <span>শিক্ষার্থী: 2180+</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-1">
                                                <span className="text-warning me-1">★</span> 4.7
                                            </div>
                                            <Button variant="outline-secondary" size="sm" className="mt-2">পশু বিভাগ</Button>
                                        </div>
                                    </div>
                                    <Form.Control
                                        type="text"
                                        className="mt-3"
                                        placeholder="প্রোফাইল দেখুন"
                                        readOnly
                                    />
                                </Card>
                            </Col>

                            {/* Expert 4 */}
                            <Col md={6}>
                                <Card className="p-3 h-100 shadow-sm">
                                    <div className="d-flex align-items-start gap-3">
                                        <div
                                            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                                            style={{ width: '50px', height: '50px', backgroundColor: '#C0EFC0' }}
                                        >
                                            শ
                                        </div>
                                        <div>
                                            <h6 className="fw-bold">শাহিনুর রহমান</h6>
                                            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                                                পোল্ট্রি ব্যবস্থাপন <br />
                                                জাতীয় পোল্ট্রি উন্নয়ন কেন্দ্র
                                            </p>
                                            <div className="d-flex flex-wrap gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                                                <span>অভিজ্ঞতা: ১২ বছর</span>
                                                <span>কোর্স: ৭টি</span>
                                                <span>শিক্ষার্থী: 1876+</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-1">
                                                <span className="text-warning me-1">★</span> 4.6
                                            </div>
                                            <Button variant="outline-secondary" size="sm" className="mt-2">পোল্ট্রি</Button>
                                        </div>
                                    </div>
                                    <Form.Control
                                        type="text"
                                        className="mt-3"
                                        placeholder="প্রোফাইল দেখুন"
                                        readOnly
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}

                {activeTab === 'webinars' && (
                    <>
                        <h4 className="fw-bold mb-4">ওয়েবিনার ও ইভেন্ট</h4>

                        <Row className="g-4">
                            {/* Webinar Card 1 */}
                            <Col md={12}>
                                <Card className="p-3 shadow-sm border-0 rounded">
                                    <Row className="align-items-center">
                                        <Col md={9}>
                                            <div className="d-flex gap-2 mb-2">
                                                <span className="badge bg-dark text-white">আসন্ন</span>
                                                <span className="badge bg-light text-dark border">সারাবছর</span>
                                            </div>
                                            <h5 className="fw-bold mb-1">জলবায়ু পরিবর্তন ও কৃষিতে এর প্রভাব</h5>
                                            <p className="text-muted mb-2" style={{ fontStyle: 'italic' }}>Climate Change and Its Impact on Agriculture</p>
                                            <div className="d-flex flex-wrap gap-3 text-secondary" style={{ fontSize: '0.9rem' }}>
                                                <span>📅 ৫ জানুয়ারি, ২০২৫</span>
                                                <span>🕘 সকাল ১০:০০</span>
                                                <span>👥 ৪৫০ অংশগ্রহণকারী</span>
                                            </div>
                                            <p className="mt-2 mb-0">বক্তা: ড. মাসুদ উদ্দিন</p>
                                        </Col>
                                        <Col md={3} className="text-end">
                                            <Link to="/register">
                                                <Button variant="primary" className="fw-bold">রেজিস্ট্রেশন</Button>
                                            </Link>

                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                            {/* Webinar Card 2 */}
                            <Col md={12}>
                                <Card className="p-3 shadow-sm border-0 rounded">
                                    <Row className="align-items-center">
                                        <Col md={9}>
                                            <div className="d-flex gap-2 mb-2">
                                                <span className="badge bg-light text-dark border">রেজিস্ট্রেশন চলছে</span>
                                                <span className="badge bg-light text-dark border">ব্যবসা</span>
                                            </div>
                                            <h5 className="fw-bold mb-1">ই-কমার্সে কৃষি পণ্য বিপণন</h5>
                                            <p className="text-muted mb-2" style={{ fontStyle: 'italic' }}>Marketing Agricultural Products on E-commerce</p>
                                            <div className="d-flex flex-wrap gap-3 text-secondary" style={{ fontSize: '0.9rem' }}>
                                                <span>📅 ৫ ফেব্রুয়ারি, ২০২৫</span>
                                                <span>🕘 বিকাল ৩:০০</span>
                                                <span>👥 ৩২০ অংশগ্রহণকারী</span>
                                            </div>
                                            <p className="mt-2 mb-0">বক্তা: রাহুল চন্দ্র দাস</p>
                                        </Col>
                                        <Col md={3} className="text-end">
                                            <Link to="/register">
                                                <Button variant="primary" className="fw-bold">রেজিস্ট্রেশন</Button>
                                            </Link>

                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}


                <div className="border rounded p-4 mt-5" style={{ backgroundColor: '#e9f7ef', borderColor: '#28a745' }}>
                    <div className="text-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#28a745" className="bi bi-award" viewBox="0 0 16 16">
                            <path d="M9.669.864 8 0 6.331.864 5.5 2.5 4 3 3 4 3.5 5.5 2.836 7.169 2 8l.836.831L3.5 10.5 3 12l1 1 1.5-.5L6.331 15 8 16l1.669-1 1.5.5 1-1-.5-1.5.836-1.669L13 7.5 13.5 6 13 4l-1-0.5-1.5-.5L9.669.864zM8 1.944 9.334 3.5 11.5 4 12 5.5 11.5 7 12 8l-1.5.5-1.334 1.556-1.333-1.556L4.5 8 4 6.5 4.5 5 6.666 4 8 1.944z" />
                        </svg>
                    </div>
                    <h4 className="text-center fw-bold mb-2">বিশেষজ্ঞ হয়ে উঠুন</h4>
                    <p className="text-center mb-4" style={{ fontSize: '1rem', color: '#555' }}>
                        আপনার কৃষি, মৎস্য বা প্রাণিসম্পদ বিষয়ক জ্ঞান শেয়ার করুন এবং কমিউনিটিকে সাহায্য করুন। <br />
                        আমাদের সাথে শিক্ষক হিসেবে যোগ দিন।
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-success">শিক্ষক হিসেবে যোগ দিন</button>
                        <button className="btn btn-outline-secondary">কোর্স তৈরি করুন</button>
                    </div>
                </div>

            </Container>
        </>
    );
}

export default Resources;
