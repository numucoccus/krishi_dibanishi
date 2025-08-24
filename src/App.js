
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import RoleSelector from './RoleSelector';
import Home from './components/Home';

function App() {
  return (

    <Router>
      <Routes>
        {/* Login + RoleSelector page */}
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

        {/* Home page */}
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />



        {/* Catch-all route: redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>







  );
}

export default App;
