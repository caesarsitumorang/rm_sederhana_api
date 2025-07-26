const express = require('express');
const router = express.Router();
const warungController = require('../controller/warung/warung_controller');
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

router.post('/create-warung', upload.single('foto_profil'), warungController.createWarung);
router.get('/warung', warungController.getAllWarung);
router.get('/warung/:id', warungController.getWarungById);
router.put('/edit-warung/:id', upload.single('foto_profil'), warungController.editWarung);
router.delete('/delete-warung/:id', warungController.deleteWarung);

module.exports = router;