const express = require('express');
const { check } = require('express-validator');
const { registerAdmin, updateAdmin, getAdmin, getHostel, deleteAdmin } = require('../controllers/adminController');
const router = express.Router();
const { authMiddleware } = require('../utils/auth');

router.post('/register-admin', authMiddleware, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Enter a valid contact number').isLength(10),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('cnic', 'CNIC is required').isLength(4),
    check('password', 'Password is required').isLength(6)
], registerAdmin);

router.post('/update-admin', authMiddleware, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('contact', 'Enter a valid contact number').isLength(10),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('cnic', 'CNIC is required').isLength(4),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('password', 'Password is required').isLength(6)
], updateAdmin);

router.post('/get-admin', authMiddleware, [
    check('isAdmin', 'isAdmin is required').notEmpty(),
    check('token', 'Token is required').notEmpty(),
], getAdmin);

router.post('/get-hostel', authMiddleware, [
    check('id', 'Id is required').notEmpty(),
], getHostel);

router.post('/delete-admin', authMiddleware, [
    check('email', 'Please include a valid email').isEmail()
], deleteAdmin);

module.exports = router;