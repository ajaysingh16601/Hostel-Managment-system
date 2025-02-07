const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerComplaint, getbyhostel, getbystudent, resolve } = require('../controllers/complaintController');
const { authMiddleware } = require('../utils/auth');

router.post('/register', authMiddleware, [
    check('student', 'Student is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], registerComplaint);

router.post('/hostel/', authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty()
], getbyhostel);

router.post('/student', authMiddleware, [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

router.post('/resolve', authMiddleware, [
    check('id', 'Complaint id is required').not().isEmpty()
], resolve);


module.exports = router;