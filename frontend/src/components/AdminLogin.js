import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLogin.css';
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.jpg";
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API for admin login
      const response = await axios.post('http://localhost:5000/admin/login', {
        username,
        password,
      });

      // Extract the JWT token from the response
      const token = response.data.token;

      // Save the token in localStorage or using a state management library
      localStorage.setItem('adminToken', token);

      // Redirect to the student management page
      <Link to='/students'></Link>;
    } catch (error) {
      console.error(error);
      alert('Invalid username or password');
    }
  };

  return (
    <>
    <div className='left'>
    <img
      src={Image1}
      alt="Image1"
      />
    </div>
    
      
    <div className="container login-container">
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        {/* Login form inputs */}
      </form>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="registerUsername">E-Mail:</label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Password:</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
    
    <div className='right'>
    <img
      src={Image2}
      alt="Image2"
      />
    </div>
    </> 
  );
};

export default AdminLogin;