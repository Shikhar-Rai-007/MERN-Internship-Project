import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import SignUp from './SignUp.js';
import AdminLogin from './AdminLogin.js';
import StudentManagement from './StudentManagement.js';
import StudentDashboard from './StudentDashBoard.js';
import Navbar from './Navbar.js';

const App = () => {
  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path="/login" element={<AdminLogin />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/students" element={<StudentManagement />}/>
          <Route path="/dashboard/:studentId" element={<StudentDashboard />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;