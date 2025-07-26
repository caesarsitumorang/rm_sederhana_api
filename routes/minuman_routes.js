const express = require('express');
const router = express.Router();
const minumanController = require('../controller/minuman/minuman_controller');
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

// Get semua minuman
router.get('/minuman', minumanController.getAllMinuman);
// Get minuman by id
router.get('/minuman/:id', minumanController.getMinumanById);
// Tambah minuman
router.post('/create-minuman', upload.single('gambar'), minumanController.createMinuman);
// Edit minuman
router.put('/edit-minuman/:id', upload.single('gambar'), minumanController.editMinuman);
// Hapus minuman
router.delete('/delete-minuman/:id', minumanController.deleteMinuman);

module.exports = router;
