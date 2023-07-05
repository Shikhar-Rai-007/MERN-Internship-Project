const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;