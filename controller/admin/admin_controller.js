const adminModels = require('../../models/admin_models');
const bcrypt = require('bcrypt');

exports.createAdmin = async (req, res) => {
  const { username, password, nama_lengkap, email } = req.body || {};
  if (!username || !password || !nama_lengkap || !email) {
    return res.status(400).json({
      messages: 'Semua field harus diisi',
      data: null,
      status: false
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { username, password: hashedPassword, nama_lengkap, email };
    adminModels.createAdmin(data, (err, result) => {
      if (err) {
        return res.status(500).json({
          messages: 'Gagal menambah admin',
          data: null,
          status: false
        });
      }
      res.json({
        messages: 'Berhasil menambah admin',
        data: result,
        status: true
      });
    });
  } catch (error) {
    return res.status(500).json({
      messages: 'Gagal hash password',
      data: null,
      status: false
    });
  }
};

exports.getAllAdmin = (req, res) => {
  adminModels.getAllAdmin((err, results) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data admin',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil mengambil data admin',
      data: results,
      status: true
    });
  });
};

exports.getAdminById = (req, res) => {
  const id = req.params.id;
  adminModels.getAdminById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data admin',
        data: null,
        status: false
      });
    }
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data admin',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data admin tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
};

exports.editAdmin = async (req, res) => {
  const id = req.params.id;
  let data = { ...req.body };
  if (data.password) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
    } catch (error) {
      return res.status(500).json({
        messages: 'Gagal hash password',
        data: null,
        status: false
      });
    }
  }
  adminModels.editAdmin(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengedit data admin',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil mengedit data admin',
        data: result,
        status: true
      });
    } else {
      res.status(400).json({
        messages: 'Tidak ada data yang diupdate',
        data: null,
        status: false
      });
    }
  });
};

exports.deleteAdmin = (req, res) => {
  const id = req.params.id;
  adminModels.deleteAdmin(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menghapus data admin',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil menghapus data admin',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data admin tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
};
