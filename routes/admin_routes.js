const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin/admin_controller');

// Get semua admin
router.get('/admin', adminController.getAllAdmin);
// Get admin by id
router.get('/admin/:id', adminController.getAdminById);
// Tambah admin
router.post('/create-admin', adminController.createAdmin);
// Edit admin
router.put('/edit-admin/:id', adminController.editAdmin);
// Hapus admin
router.delete('/delete-admin/:id', adminController.deleteAdmin);

module.exports = router;
