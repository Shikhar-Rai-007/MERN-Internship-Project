import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import AdminLogin from './components/AdminLogin.js';
import StudentManagement from './components/StudentManagement.js';
import Navbar from './Navbar.js';
const App = () => {
  const isAdminLoggedIn =1; //localStorage.getItem('isAdminLoggedIn');

  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<AdminLogin />}/>
          {/* <Route path="/AdminDashBoard" element={<AdminDashBoard />} /> */}
          <Route
            path="/students"
            element={<StudentManagement />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;