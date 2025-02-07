const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { generateInvoices, getInvoicesbyid, getInvoices, updateInvoice } = require('../controllers/invoiceController');
const { authMiddleware } = require('../utils/auth');

router.post('/generate', authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty(),
], generateInvoices);

router.post('/getbyid', authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty()
], getInvoicesbyid);

router.post('/student', authMiddleware, [
    check('student', 'Student is required').not().isEmpty()
], getInvoices);

router.post('/update', authMiddleware, [
    check('student', 'Student is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateInvoice);

module.exports = router;