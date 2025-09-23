import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-5" style={{ backgroundColor: '#e9f7ef' }}>
        <div className="container">
          <h2 className="fw-bold text-success">BD কৃষি দিবানিশি</h2>
          <h4 className="mt-3">বাংলাদেশের সমন্বিত কৃষি, মৎস্য ও প্রাণিসম্পদ প্ল্যাটফর্ম</h4>
          <p className="mt-3 mb-4 text-muted">
            Krishi Dibanishi - Bangladesh's Integrated Agriculture, Fisheries & Livestock Platform<br />
            বাংলাদেশের কৃষক, মৎস্যজীবী ও খামারিদের জন্য আধুনিক ডিজিটাল সমাধান। বিশেষজ্ঞ পরামর্শ, প্রযুক্তিগত সহায়তা এবং একটি প্রাণবন্ত কমিউনিটি।
          </p>
          
          {/* আজই যোগ দিন Button */}
          <div className="mb-5">
            <Link to="/register" className="btn btn-success btn-lg px-5 py-3 fw-bold">
              আজই যোগ দিন
            </Link>
          </div>

          {/* Stats Section */}
          <div className="row mt-5 justify-content-center">
            <div className="col-md-10">
              <div className="bg-white p-4 rounded shadow text-center">
                <h5 className="fw-bold text-success mb-4">সারা বাংলাদেশে সেবা</h5>
                <p className="text-muted">টাঙ্গুয়ার পাহাড় থেকে সুন্দরবনের উপকূল - সারা দেশের কৃষি সম্প্রদায়ের সেবায়</p>

                <div className="row mt-4">
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">২৫,৮০০+</h4>
                    <p className="text-muted">নিবন্ধিত সদস্য<br /><small>Registered Members</small></p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">১২,৬০০+</h4>
                    <p className="text-muted">সক্রিয় খামার<br /><small>Active Farms</small></p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">৮,৪০০+</h4>
                    <p className="text-muted">বিশেষজ্ঞ পরামর্শ<br /><small>Expert Consultants</small></p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-success fw-bold">৩,৮০০+</h4>
                    <p className="text-muted">সফল প্রকল্প<br /><small>Successful Projects</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">আমাদের মিশন</h3>
            <p className="text-muted mb-4">Our Mission</p>
            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">🎯</div>
                  <h5 className="fw-bold">লক্ষ্য</h5>
                  <p>ডিজিটাল প্রযুক্তির মাধ্যমে বাংলাদেশের কৃষি খাতকে আধুনিকীকরণ এবং কৃষকদের আয় বৃদ্ধি করা</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">🌟</div>
                  <h5 className="fw-bold">দৃষ্টিভঙ্গি</h5>
                  <p>একটি ডিজিটাল বাংলাদেশ গড়ে তোলা যেখানে প্রতিটি কৃষক প্রযুক্তির সুবিধা ভোগ করবে</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">💪</div>
                  <h5 className="fw-bold">উদ্দেশ্য</h5>
                  <p>কৃষি উৎপাদনশীলতা বৃদ্ধি এবং টেকসই কৃষি ব্যবস্থাপনা নিশ্চিত করা</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">আমাদের সেবা ক্ষেত্র</h3>
            <p className="text-muted mb-4">Our Service Areas</p>
            <div className="row g-4 justify-content-center">
              {/* Card 1 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🌾</div>
                  <h5 className="fw-bold">ফসল চাষ</h5>
                  <p className="text-muted">Crop Farming</p>
                  <small>ধান, গম, সবজি, ফল ও অন্যান্য ফসল</small>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🐟</div>
                  <h5 className="fw-bold">মাছ চাষ</h5>
                  <p className="text-muted">Fish Farming</p>
                  <small>দেশি-বিদেশি মাছ ও চিংড়ি চাষ</small>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🐄</div>
                  <h5 className="fw-bold">গবাদিপশু পালন</h5>
                  <p className="text-muted">Cattle Farming</p>
                  <small>গরু, মহিষ, ছাগল ও ভেড়া পালন</small>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="col-md-3">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🐓</div>
                  <h5 className="fw-bold">মুরগি পালন</h5>
                  <p className="text-muted">Poultry Farming</p>
                  <small>মুরগি, হাঁস ও অন্যান্য পাখি পালন</small>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">আমাদের বিশেষ সুবিধাসমূহ</h3>
            <p className="text-muted mb-4">Our Key Features</p>
            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">👨‍🌾</div>
                  <h5 className="fw-bold">কৃষক কমিউনিটি</h5>
                  <p>অভিজ্ঞতা বিনিময় এবং সমস্যা সমাধানের জন্য কৃষকদের মধ্যে সংযোগ স্থাপন</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">🔬</div>
                  <h5 className="fw-bold">বিশেষজ্ঞ পরামর্শ</h5>
                  <p>কৃষি বিশেষজ্ঞদের সরাসরি পরামর্শ এবং সমস্যা সমাধান</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">📊</div>
                  <h5 className="fw-bold">বাজার তথ্য</h5>
                  <p>রিয়েল-টাইম বাজার দাম এবং উৎপাদন পরামর্শ</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">🌧️</div>
                  <h5 className="fw-bold">আবহাওয়া সেবা</h5>
                  <p>কৃষি-বান্ধব আবহাওয়া পূর্বাভাস এবং সতর্কতা</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">💰</div>
                  <h5 className="fw-bold">অর্থায়ন সুবিধা</h5>
                  <p>কৃষি ঋণ এবং বিনিয়োগের সুযোগ সম্পর্কিত তথ্য</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">📱</div>
                  <h5 className="fw-bold">মোবাইল অ্যাপ</h5>
                  <p>যেকোনো সময়, যেকোনো স্থান থেকে সেবা পাওয়া</p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Partners Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">আমাদের কমিউনিটি অংশীদার</h3>
            <p className="text-muted mb-4">Our Community Partners</p>
            <div className="row g-4 justify-content-center">
              <div className="col-md-2">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">👨‍🌾</div>
                  <h6 className="fw-bold">কৃষক</h6>
                  <small>Farmers</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">👨‍🔬</div>
                  <h6 className="fw-bold">বিশেষজ্ঞ</h6>
                  <small>Experts</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🤝</div>
                  <h6 className="fw-bold">সমন্বয়কারী</h6>
                  <small>Coordinators</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">💡</div>
                  <h6 className="fw-bold">উদ্যোক্তা</h6>
                  <small>Innovators</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">🚚</div>
                  <h6 className="fw-bold">সরবরাহকারী</h6>
                  <small>Suppliers</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card p-3 h-100 shadow-sm">
                  <div className="fs-1 mb-2">💼</div>
                  <h6 className="fw-bold">বিনিয়োগকারী</h6>
                  <small>Investors</small>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge & Resource Exchange Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">জ্ঞান, প্রযুক্তি ও সহায়তার আদান-প্রদান</h3>
            <p className="text-muted mb-4">Exchange Knowledge, Technology & Support</p>
            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">📚</div>
                  <h5 className="fw-bold">জ্ঞান ভান্ডার</h5>
                  <p>কৃষি সম্পর্কিত সর্বশেষ তথ্য, গবেষণা এবং সেরা অনুশীলন</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">💻</div>
                  <h5 className="fw-bold">প্রযুক্তি সহায়তা</h5>
                  <p>আধুনিক কৃষি প্রযুক্তি, সরঞ্জাম এবং ডিজিটাল সমাধান</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">👥</div>
                  <h5 className="fw-bold">কমিউনিটি সহায়তা</h5>
                  <p>অভিজ্ঞতা বিনিময়, প্রশ্নোত্তর এবং সম্মিলিত সমস্যা সমাধান</p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">সাফল্যের গল্প</h3>
            <p className="text-muted mb-4">Success Stories</p>
            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">⭐</div>
                  <h5 className="fw-bold">রবিউল ইসলাম</h5>
                  <p className="text-muted">রংপুরের কৃষক</p>
                  <p>"এই প্ল্যাটফর্মের মাধ্যমে আমি আধুনিক চাষাবাদ শিখে আমার উৎপাদন ৪০% বাড়িয়েছি"</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">⭐</div>
                  <h5 className="fw-bold">ড. সেলিনা আক্তার</h5>
                  <p className="text-muted">কৃষি বিশেষজ্ঞ</p>
                  <p>"সারা বাংলাদেশের কৃষকদের সাথে সরাসরি সংযোগ করে তাদের সমস্যা সমাধান করতে পারছি"</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 shadow-sm">
                  <div className="fs-1 mb-3">⭐</div>
                  <h5 className="fw-bold">আনোয়ার হোসেন</h5>
                  <p className="text-muted">মৎস্য চাষী, খুলনা</p>
                  <p>"বিশেষজ্ঞ পরামর্শে আমার মাছের খামারের রোগ নিয়ন্ত্রণ করতে সক্ষম হয়েছি"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Join Section */}
          <div className="text-center mt-5 py-5">
            <h3 className="fw-bold mb-3">আমাদের কমিউনিটিতে যোগ দিন</h3>
            <p className="text-muted mb-4">বাংলাদেশের কৃষি বিপ্লবে অংশ নিন</p>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="bg-white p-4 rounded shadow">
                  <h5 className="text-success fw-bold mb-3">কেন যোগ দেবেন?</h5>
                  <div className="row text-start">
                    <div className="col-md-6">
                      <ul>
                        <li>বিনামূল্যে বিশেষজ্ঞ পরামর্শ</li>
                        <li>সর্বশেষ কৃষি প্রযুক্তি সম্পর্কে জানুন</li>
                        <li>বাজার দাম এবং চাহিদা সম্পর্কে আপডেট থাকুন</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>অন্যান্য কৃষকদের সাথে অভিজ্ঞতা বিনিময়</li>
                        <li>কৃষি ঋণ এবং সহায়তা সম্পর্কিত তথ্য</li>
                        <li>প্রশিক্ষণ এবং কর্মশালার সুযোগ</li>
                      </ul>
                    </div>
                  </div>
                  <Link to="/register" className="btn btn-success btn-lg px-5 py-3 fw-bold mt-3">
                    আজই রেজিস্ট্রেশন করুন
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">যোগাযোগ</h3>
            <p className="text-muted mb-4">Contact Information</p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="bg-light p-4 rounded">
                  <p><strong>ইমেইল:</strong> info@krishidibanishi.com</p>
                  <p><strong>হেল্পলাইন:</strong> ১৬৫৫৫</p>
                  <p><strong>ঠিকানা:</strong> কৃষি ভবন, ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;