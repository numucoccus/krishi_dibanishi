import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import RoleSelector from './RoleSelector';

function App() {
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          
          <RoleSelector />
            <LoginForm />

        </div>
      </div>
    </div>
  );
}

export default App;
