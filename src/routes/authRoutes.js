const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // opcional, só para criar user
router.post('/login', authController.login);

module.exports = router;
