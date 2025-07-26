const penjualModels = require('../../models/penjual_models');
const bcrypt = require('bcrypt');

exports.createPenjual = async (req, res) => {
  const { nama, email, no_hp, jenis_kelamin, username, password, alamat } = req.body || {};
  if (!nama || !email || !no_hp || !jenis_kelamin || !username || !password || !alamat) {
    return res.status(400).json({
      messages: 'Semua field wajib diisi',
      data: null,
      status: false
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { nama, email, no_hp, jenis_kelamin, username, password: hashedPassword, alamat };
    penjualModels.createPenjual(data, (err, result) => {
      if (err) {
        return res.status(500).json({
          messages: 'Gagal menambah penjual',
          data: null,
          status: false
        });
      }
      res.json({
        messages: 'Berhasil menambah penjual',
        data: result,
        status: true
      });
    });
  } catch (error) {
    res.status(500).json({
      messages: 'Gagal hash password',
      data: null,
      status: false
    });
  }
};

exports.getAllPenjual = (req, res) => {
  penjualModels.getAllPenjual((err, results) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data penjual',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil mengambil data penjual',
      data: results,
      status: true
    });
  });
};

exports.getPenjualByid = (req, res) => {
   const { id } = req.user; // Ambil dari token
  penjualModels.getPenjualById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data penjual',
        data: null,
        status: false
      });
    }
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data penjual ',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data penjual tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
}

exports.editPenjual = async (req, res) => {
  const id = req.params.id;
  let data = req.body || {};
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
  penjualModels.editPenjual(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengedit data penjual',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil mengedit data penjual',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data penjual tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
};

exports.deletePenjual = (req, res) => {
  const id = req.params.id;
  penjualModels.deletePenjual(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menghapus data penjual',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil menghapus data penjual',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data penjual tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
};