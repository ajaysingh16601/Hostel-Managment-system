const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerStudent, getStudent, getAllStudents, updateStudent, deleteStudent, csvStudent } = require('../controllers/studentController');
const { authMiddleware } = require('../utils/auth');

router.post('/register-student', authMiddleware, [
    check('name', 'Name is required').not().isEmpty(),
    check('cms_id', 'CMS ID of at least 6 digit is required').isLength(6),
    check('room_no', 'Room number is required').isLength(1),
    check('batch', 'Batch is required').not().isEmpty(),
    check('dept', 'Department is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Enter a valid contact number').isLength(11),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('cnic', 'Enter valid CNIC').isLength(13),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
], registerStudent);

router.post('/get-student', [
    check('isAdmin', 'isAdmin is required').notEmpty(),
    check('token', 'You donot have a valid token').notEmpty()
], getStudent);

router.post('/get-all-students',authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty()
],
getAllStudents);

router.post('/update-student', authMiddleware, [
    check('cms_id', 'CMS ID is required').not().isEmpty(),
    check('room_no', 'Room number is required').not().isEmpty(),
    check('batch', 'Batch is required').not().isEmpty(),
    check('dept', 'Department is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Contact is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('cnic', 'CNIC is required').not().isEmpty(),
    check('user', 'User is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty()
], updateStudent);

router.delete('/delete-student', authMiddleware, [
    check('id', 'Enter a valid ID').not().isEmpty(),
], deleteStudent);

router.post('/csv', authMiddleware, [
    check('hostel', 'Hostel is required').not().isEmpty()
], csvStudent);


module.exports = router;