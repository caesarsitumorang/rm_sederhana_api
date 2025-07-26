const express = require('express');
const router = express.Router();

const pesananController = require('../controller/pesanan/pesanan_controller');
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

router.get('/pesanan', pesananController.getAllPesanan);
router.get('/pesanan/:id', pesananController.getPesananById);
router.post('/create-pesanan', upload.single('bukti_pembayaran'), pesananController.createPesanan);
// Edit pesanan dengan upload bukti pembayaran
router.put('/edit-pesanan/:id', upload.single('bukti_pembayaran'), pesananController.editPesanan);
// Hapus pesanan
router.delete('/delete-pesanan/:id', pesananController.deletePesanan);

module.exports = router;
