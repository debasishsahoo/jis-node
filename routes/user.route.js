// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware'); // JWT verification

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/change-password', authMiddleware, userController.changePassword);
router.get('/user', authMiddleware, userController.user);
module.exports = router;