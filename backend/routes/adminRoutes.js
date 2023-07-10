const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const Student = require('../models/Student');

//Create a new User
router.post('/register', async (req, res) => {
    //const { name, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) return res.status(402).json({ error: "User already exists" });

        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        const newUser = new User({ name:req.body.name, email:req.body.email, password:secPass });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ error: "Incomplete Credentials" });

        const userLogin = await User.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userLogin.password);

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credentials" });
        }
        else {
            res.json({ message: "Login Successful" });
        }
    }
    catch (err) { console.log(err); }
});

// Get all students
router.get('/getStudents', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new student
router.post('/addStudent', async (req, res) => {
    const { name, age, grade } = req.body;

    try {
        const newStudent = new Student({ name, age, grade });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a student
router.put('/updateStudent/:id', async (req, res) => {
    const { name, age, grade } = req.body;
    const { id } = req.params;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, grade },
            { new: true }
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a student
router.delete('/deleteStudent/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Student.findByIdAndDelete(id);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Post Attendance
router.post('/postAttendance/:studentId', async (req, res) => {
    try {
      const { date, status } = req.body;
      const student = await Student.findById(req.params.studentId);
  
      // Add the attendance entry to the student's attendance array
      student.attendance.push({ date, status });
  
      // Save the updated student document
      await student.save();
  
      res.status(200).json({ message: 'Attendance added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router;