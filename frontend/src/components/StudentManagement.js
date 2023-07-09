import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentManagement.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/getStudents');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();

    const newStudent = { name, age, grade };

    try {
      const response = await axios.post('http://localhost:5000/admin/addStudent', newStudent);
      alert(`Student Added Successfully`);
      setStudents([...students, response.data]);
      setName('');
      setAge('');
      setGrade('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/deleteStudent/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const postAttendance = async (id) => {
    try {
      const attendanceDate = new Date().toISOString().slice(0, 10); // Get the current date
      const attendanceStatus = 'Present'; 

      // Send a POST request to the backend API to post attendance
      await axios.post(`http://localhost:5000/admin/postAttendance/${id}`, {
        date: attendanceDate,
        status: attendanceStatus
      });

      alert(`Attendance posted Successfully`);
    } catch (error) {
      console.error(error);
    }
  };

  const viewRecord = (studentId) => {
    navigate(`/dashboard/${studentId}`);
  };

  return (
    <div className="student-management-background">
      <div className="container student-management-container">
        <h2 className="mb-4">Student Management</h2>
        <form onSubmit={addStudent}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div><br></br>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div><br></br>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              />
            </div><br></br>
            <div className="col">
              <button type="submit" className="btn btn-primary">Add Student</button>
            </div><br></br>
          </div>
        </form>
        <table className="table mt-4">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={() => postAttendance(student._id)}>
                    Post Attendance
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => viewRecord(student._id)}
                  >
                    View Record
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default StudentManagement;
