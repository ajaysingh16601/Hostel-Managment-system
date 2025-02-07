const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, getAll } = require('../controllers/requestController');
const { authMiddleware } = require('../utils/auth');

router.post('/register', [
    check('cms_id', 'CMS ID is required').not().isEmpty()
], register);

router.get('/getall',authMiddleware, getAll);

module.exports = router;