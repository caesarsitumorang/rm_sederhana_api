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
    const result = await penjualModels.createPenjual(data);
    res.json({
      messages: 'Berhasil menambah penjual',
      data: result,
      status: true
    });
  } catch (error) {
    res.status(500).json({
      messages: 'Gagal menambah penjual',
      data: null,
      status: false
    });
  }
};

exports.getAllPenjual = async (req, res) => {
  try {
    const results = await penjualModels.getAllPenjual();
    res.json({
      messages: 'Berhasil mengambil data penjual',
      data: results,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data penjual',
      data: null,
      status: false
    });
  }
};

exports.getPenjualById = async (req, res) => {
  const id = req.params.id || (req.user && req.user.id);
  try {
    const result = await penjualModels.getPenjualById(id);
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data penjual',
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data penjual',
      data: null,
      status: false
    });
  }
};

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
  try {
    const result = await penjualModels.editPenjual(id, data);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengedit data penjual',
      data: null,
      status: false
    });
  }
};

exports.deletePenjual = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await penjualModels.deletePenjual(id);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menghapus data penjual',
      data: null,
      status: false
    });
  }
};