import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import LoginForm from "./LoginForm";
import RoleSelector from "./RoleSelector";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import RegistrationForm from "./components/Registration/RegistrationForm";
import RegistrationSuccess from "./components/Registration/RegistrationSuccess";
import Community from "./components/Community";
import Resources from './components/Resources';
import Marketplace from './components/Marketplace/Marketplace_1';
import ProfilePage from "./components/ProfilePage";
import OpenHome from "./components/OpenHome";
import About from "./components/About"; // Add this import

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));
  const [supplierView, setSupplierView] = React.useState(user?.role?.toLowerCase() === "supplier");

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setSupplierView(storedUser?.role?.toLowerCase() === "supplier");
  }, []);

  return (
      <Routes>
        {/* Login + Role Selector */}
        <Route path="/" element={
          <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            {/* Website Name at the top */}
            <div className="position-absolute top-0 start-50 translate-middle-x mt-4">
              <h1 className="text-green fw-bold">কৃষি দিবানিশি</h1>
            </div>
            
            <div className="row w-100 justify-content-center align-items-center">
              {/* Green About Button Box */}
              <div className="col-12 col-md-4 mb-3 mb-md-0">
                <button 
                  className="btn btn-green w-100 h-100 d-flex align-items-center justify-content-center about-button"
                  onClick={() => window.location.href = '/about'}
                  style={{ 
                    height: '100%', 
                    minHeight: '300px' // Adjust to match login box height
                  }}
                >
                  <span className="text-white fw-bold fs-5">আমাদের সম্পর্কে জানুন</span>
                </button>
              </div>
              
              {/* Login Form */}
              <div className="col-12 col-md-4">
                <LoginForm />
              </div>
            </div>
          </div>
        }/>

        {/* Add About Route */}
        <Route path="/about" element={<About />} />

        {/* Registration */}
        <Route path="/register" element={
          <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="row w-100 justify-content-center">
              <div className="col-md-10 col-lg-8"><RegistrationForm /></div>
            </div>
          </div>
        }/>

        <Route path="/success" element={<RegistrationSuccess />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />

        {/* Marketplace */}
        <Route
          path="/market"
          element={<Marketplace supplierView={supplierView} />}
        />

        {/* Login route */}
        <Route path="/login" element={<LoginForm />} />

        {/* Resources */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default AppWrapper;