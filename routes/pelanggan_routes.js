const express = require('express');
const router = express.Router();
const pelangganController = require('../controller/pelanggan/pelanggan_controller');
const { verifyToken } = require('../auth/authMiddleware');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../upload'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


// Route untuk mendapatkan semua pelanggan
router.get('/pelanggan', pelangganController.getAllPelanggan);
router.post('/create-pelanggan', upload.single('foto'), pelangganController.createPelanggan);
router.put('/edit-pelanggan/:id', upload.single('foto'), pelangganController.editPelanggan);
router.delete('/delete-pelanggan/:id', pelangganController.deletePelanggan);
router.get('/profile-pelanggan', verifyToken, pelangganController.getPelangganById);

module.exports = router;