import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [grade, setGrade] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/student/getAttendance/${studentId}`);
      const { attendance, grade } = response.data;

      setAttendance(attendance);
      setGrade(grade);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <h3>Attendance</h3>
      <ul>
        {attendance.map((entry, index) => (
          <li key={index}>
            <strong>Date:</strong> {entry.date}, <strong>Status:</strong> {entry.status}
          </li>
        ))}
      </ul>
      <h3>Grade: {grade}</h3>
    </div>
  );
};

export default StudentDashboard;