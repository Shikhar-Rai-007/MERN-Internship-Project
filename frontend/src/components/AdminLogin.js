import React, { useState } from 'react';
import { Navigate, useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API for admin login
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      // Extract the JWT token from the response
      const token = response.data.token;

      // Save the token in localStorage or using a state management library
      localStorage.setItem('adminToken', token);

      // Redirect to the student management page
      <Navigate to='/students'></Navigate>;
    } catch (error) {
      console.error(error);
      alert('Invalid username or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API for admin registration
      await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });

      alert('Admin registered successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to register admin');
    }
  };

  return (
    <div className="container login-container">
      <img></img>
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        {/* Login form inputs */}
      </form>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="registerUsername">Username:</label>
          <input
            type="text"
            className="form-control"
            id="registerUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
  );
};

export default AdminLogin;