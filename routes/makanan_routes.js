const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const makananController = require('../controller/makanan/makanan_controller');

// ✅ Gunakan memoryStorage agar tidak menyentuh file sistem
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get semua makanan
router.get('/makanan', makananController.getAllMakanan);

// Get makanan by id
router.get('/makanan/:id', makananController.getMakananById);

// Tambah makanan dengan upload gambar ke Vercel Blob
router.post('/create-makanan', upload.single('gambar'), makananController.createMakanan);

// Edit makanan dengan upload gambar ke Vercel Blob
router.put('/edit-makanan/:id', upload.single('gambar'), makananController.editMakanan);

// Hapus makanan
router.delete('/delete-makanan/:id', makananController.deleteMakanan);

module.exports = router;
