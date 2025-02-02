const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requestMessOff, countMessOff, listMessOff, updateMessOff } = require('../controllers/messoffController');

router.post('/request', [
    check('student', 'Student ID is required').not().isEmpty(),
    check('leaving_date', 'Leaving date is required').not().isEmpty(),
    check('return_date', 'Return date is required').not().isEmpty()
], requestMessOff);

router.post('/count', [
    check('student', 'Student ID is required').not().isEmpty()
], countMessOff);

router.post('/list', [
    check('hostel', 'Hostel is required').not().isEmpty()
], listMessOff);

router.post('/update', [
    check('id', 'ID is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateMessOff);

module.exports = router;