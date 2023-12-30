const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đăng ký
router.post('/register', authController.registerUser);
// Đăng nhập
router.post('/login', authController.loginUser);


module.exports = router;
