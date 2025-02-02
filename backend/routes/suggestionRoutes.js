const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerSuggestion, getbyhostel, getbystudent, updateSuggestion } = require('../controllers/suggestionController');

router.post('/register', [
    check('student', 'Student is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], registerSuggestion);

router.post('/hostel', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getbyhostel);

router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

router.post('/update', [
    check('id', 'Id is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateSuggestion);

module.exports = router;