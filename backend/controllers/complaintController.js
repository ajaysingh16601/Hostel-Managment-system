const { validationResult } = require('express-validator');
const { Complaint } = require('../models');

exports.registerComplaint = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student, hostel, type, title, description } = req.body;
    try {
        const newComplaint = new Complaint({
            student,
            hostel,
            type,
            title,
            description
        });
        await newComplaint.save();
        success = true;
        res.json({ success, msg: 'Complaint registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getbyhostel = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    try {
        const complaints = await Complaint.find({ hostel }).populate('student', ['name', 'room_no']);
        success = true;
        res.json({ success, complaints });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getbystudent = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student } = req.body;
    try {
        const complaints = await Complaint.find({ student });
        success = true;
        res.json({ success, complaints });
    }
    catch (err) {
        console.error(err.errors);
        res.status(500).send('Server error');
    }
}

exports.resolve = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { id } = req.body;
    try {
        const complaint = await Complaint.findById(id);
        complaint.status = "solved";
        await complaint.save();
        success = true;
        res.json({ success });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}