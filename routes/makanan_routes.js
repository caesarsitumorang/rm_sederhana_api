const express = require('express');
const router = express.Router();

const makananController = require('../controller/makanan/makanan_controller');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer
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

// Get semua makanan
router.get('/makanan', makananController.getAllMakanan);
// Get makanan by id
router.get('/makanan/:id', makananController.getMakananById);
// Tambah makanan dengan upload gambar
router.post('/create-makanan', upload.single('gambar'), makananController.createMakanan);
// Edit makanan dengan upload gambar
router.put('/edit-makanan/:id', upload.single('gambar'), makananController.editMakanan);
// Hapus makanan
router.delete('/delete-makanan/:id', makananController.deleteMakanan);

module.exports = router;
