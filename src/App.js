import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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


function App() {
  return (
    <Router>
      <Routes>
        {/* Login + Role Selector page (root path) */}
        <Route
          path="/"
          element={
            <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
              <div className="row w-100 justify-content-center align-items-center">
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <RoleSelector />
                </div>
                <div className="col-12 col-md-4">
                  <LoginForm />
                </div>
              </div>
            </div>
          }
        />

        {/* Registration page */}
        <Route
          path="/register"
          element={
            <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
              <div className="row w-100 justify-content-center">
                <div className="col-md-10 col-lg-8">
                  <RegistrationForm />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/success" element={<RegistrationSuccess />} />

        {/* Home page */}
        <Route path="/home" element={<Home />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Community page */}
        <Route path="/community" element={<Community />} />

        {/* Login route */}
        <Route path="/login" element={<LoginForm />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* Resources page */}
        <Route path="/resources" element={<Resources />} />


      </Routes>
    </Router>
  );
}

export default App;
