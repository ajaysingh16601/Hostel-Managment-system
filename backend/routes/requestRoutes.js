const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, getAll } = require('../controllers/requestController');

router.post('/register', [
    check('cms_id', 'CMS ID is required').not().isEmpty()
], register);

router.get('/getall', getAll);

module.exports = router;