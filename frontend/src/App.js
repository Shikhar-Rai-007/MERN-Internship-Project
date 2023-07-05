import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import studentImage from '../src/student.png';

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();

    const newStudent = { name, age, grade };

    try {
      const response = await axios.post('http://localhost:5000/api/students', newStudent);
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
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Student Management System</h1>

      <form className="form" onSubmit={addStudent}>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          className="input"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          className="input"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
        <button type="submit" className="btn">Add Student</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => deleteStudent(student._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <img src={studentImage} alt="Students" className="image" />
    </div>
  );
};

export default App;