// authRoutes
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, changePassword, verifySession } = require('../controllers/authController');
const { authMiddleware } = require('../utils/auth');

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], login);

router.post('/change-password', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Old password is required').isLength({ min: 6 }),
    check('newPassword', 'New password of more than 8 character is required').isLength({ min: 6 })
], changePassword);

router.post('/verifysession', authMiddleware, verifySession);

module.exports = router;
