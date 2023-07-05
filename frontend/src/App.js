import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import AdminLogin from './components/AdminLogin.js';
import StudentManagement from './components/StudentManagement.js';

const App = () => {
  const isAdminLoggedIn =1; //localStorage.getItem('isAdminLoggedIn');

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />}/>
          {/* <Route path="/AdminDashBoard" element={<AdminDashBoard />} /> */}
          <Route
            path="/students"
            render={() =>
              isAdminLoggedIn ? (
                <StudentManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;