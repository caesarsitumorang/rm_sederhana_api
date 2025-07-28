const express = require('express');
const router = express.Router();
const penjualController = require('../controller/penjual/penjual_controller');
const { verifyToken } = require('../auth/authMiddleware');

router.post('/create-penjual', penjualController.createPenjual);
router.get('/penjual', penjualController.getAllPenjual);
router.get('/profile-penjual', verifyToken, penjualController.getPenjualById);
router.put('/edit-penjual/:id', penjualController.editPenjual);
router.delete('/delete-penjual/:id', penjualController.deletePenjual);

module.exports = router;