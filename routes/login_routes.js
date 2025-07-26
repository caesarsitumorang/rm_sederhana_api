const express = require('express');
const router = express.Router();
const loginController = require('../auth/pelanggan/login_controller');
const loginPenjualController = require('../auth/penjual/login_penjual');

// Route login pelanggan
router.post('/login-pelanggan', loginController.loginPelanggan);
router.post('/login-penjual', loginPenjualController.loginPenjual);

module.exports = router;
