const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requestMessOff, countMessOff, listMessOff, updateMessOff } = require('../controllers/messoffController');
const { authMiddleware } = require('../utils/auth');

router.post('/request', authMiddleware, [
    check('student', 'Student ID is required').not().isEmpty(),
    check('leaving_date', 'Leaving date is required').not().isEmpty(),
    check('return_date', 'Return date is required').not().isEmpty()
], requestMessOff);

router.post('/count', authMiddleware, [
    check('student', 'Student ID is required').not().isEmpty()
], countMessOff);

router.post('/list', authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty()
], listMessOff);

router.post('/update', authMiddleware, [
    check('id', 'ID is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateMessOff);

module.exports = router;