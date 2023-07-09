const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/StudentSchema');

router.post('/registerStudent', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) return res.status(402).json({ error: "User already exists" });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/loginStudent', async (req, res) => {
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

router.get('/getAttendance/:studentId', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        const { attendance, grade } = student;

        res.status(200).json({ attendance, grade });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;