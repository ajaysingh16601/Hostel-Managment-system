const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { markAttendance, getAttendance, updateAttendance, getHostelAttendance } = require('../controllers/attendanceController');

router.post('/mark', [
    check('student', 'Student is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], markAttendance);

router.post('/get', [
    check('student', 'Student is required').not().isEmpty()
], getAttendance);

router.put('/update', [
    check('student', 'Student is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateAttendance);

router.post('/getHostelAttendance', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getHostelAttendance);

module.exports = router;