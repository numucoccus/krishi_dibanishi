import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component imports
import LoginForm from './LoginForm';
import RoleSelector from './RoleSelector';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/Registration/RegistrationForm'; // Make sure this path is correct
import RegistrationSuccess from './components/Registration/RegistrationSuccess';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login + Role Selector page (root path) */}
        <Route
          path="/"
          element={
            <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
              <div className="row w-100 justify-content-center">
                <div className="col-md-6 col-lg-4">
                  <RoleSelector />
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

        {/* Login route (optional, used in navbar) */}
        <Route path="/login" element={<LoginForm />} />

        {/* Catch-all: redirect unknown paths to login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;