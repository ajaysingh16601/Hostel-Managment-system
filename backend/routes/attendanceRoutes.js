// attendanceRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { markAttendance, getAttendance, updateAttendance, getHostelAttendance } = require('../controllers/attendanceController');
const { authMiddleware } = require('../utils/auth');

router.post('/mark', authMiddleware, [
    check('student', 'Student is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], markAttendance);

router.post('/get', authMiddleware, [
    check('student', 'Student is required').not().isEmpty()
], getAttendance);

router.put('/update', authMiddleware, [
    check('student', 'Student is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateAttendance);

router.post('/getHostelAttendance', authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty()
], getHostelAttendance);

module.exports = router;