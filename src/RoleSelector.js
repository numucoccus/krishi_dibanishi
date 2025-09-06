import React, { useState } from "react";

export default function RoleSelector() {
  const roles = [
    { title: "কৃষক", subtitle: "Farmer", desc: "আমি ফসল, মাছ, গবাদিপশু বা মুরগি চাষ করি" },
    { title: "কৃষি বিশেষজ্ঞ", subtitle: "Agricultural Expert", desc: "আমি কৃষি, মৎস্য বা প্রাণিসম্পদ বিশেষজ্ঞ" },
    { title: "স্থানীয় সমন্বয়কারী", subtitle: "Local Coordinator", desc: "আমি স্থানীয় কৃষকদের সমন্বয় করি" },
    { title: "স্টার্টআপ উদ্যোক্তা", subtitle: "Startup Innovator", desc: "আমি কৃষি প্রযুক্তিতে কাজ করি" },
    { title: "সরবরাহকারী", subtitle: "Supplier", desc: "আমি কৃষি উপকরণ ও খাদ্য সরবরাহ করি" },
    { title: "নিবেশকারী", subtitle: "Investor", desc: "আমি কৃষি খাতে বিনিয়োগ করি" }
  ];

  const [selectedRole, setSelectedRole] = useState(null);

  const selectRole = (index) => {
    setSelectedRole(index);
  };

  return (
    <div className="card p-4 shadow-sm mb-4 h-100 w-100">
      <h5 className="fw-bold mb-2">আপনার ভূমিকা নির্বাচন করুন</h5>
      <p className="text-muted small mb-3">Select your role in the agricultural ecosystem</p>
      <div className="row g-3 h-100">
        {roles.map((role, i) => (
          <div className="col-6" key={i}>
            <div
              className={`card h-100 p-3 shadow-sm border ${selectedRole === i ? 'border-success' : 'border-light'}`}
              onClick={() => selectRole(i)}
              style={{ cursor: "pointer" }}
            >
              <h6 className="text-success fw-bold mb-1">
                {role.title} <span className="text-muted">({role.subtitle})</span>
              </h6>
              <p className="small text-muted mb-0">{role.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
