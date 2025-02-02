const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerComplaint, getbyhostel, getbystudent, resolve } = require('../controllers/complaintController');

router.post('/register', [
    check('student', 'Student is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], registerComplaint);

router.post('/hostel/', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getbyhostel);

router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

router.post('/resolve', [
    check('id', 'Complaint id is required').not().isEmpty()
], resolve);


module.exports = router;