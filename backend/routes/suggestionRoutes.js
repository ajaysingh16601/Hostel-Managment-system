const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerSuggestion, getbyhostel, getbystudent, updateSuggestion } = require('../controllers/suggestionController');
const { authMiddleware } = require('../utils/auth');

router.post('/register', authMiddleware, [
    check('student', 'Student is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], registerSuggestion);

router.post('/hostel', authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty()
], getbyhostel);

router.post('/student', authMiddleware, [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

router.post('/update', authMiddleware, [
    check('id', 'Id is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateSuggestion);

module.exports = router;