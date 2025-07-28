const minumanModels = require('../../models/minuman_models');

exports.createMinuman = async (req, res) => {
  const { nama, deskripsi, harga, ukuran, stok } = req.body || {};
  let gambar = null;
  if (req.file) {
    gambar = req.file.filename;
  }
  if (!nama || !harga) {
    return res.status(400).json({
      messages: 'Nama dan harga wajib diisi',
      data: null,
      status: false
    });
  }
  const data = { nama, deskripsi, harga, ukuran, stok, gambar };
  try {
    const result = await minumanModels.createMinuman(data);
    res.json({
      messages: 'Berhasil menambah minuman',
      data: result,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menambah minuman',
      data: null,
      status: false
    });
  }
};

exports.getAllMinuman = async (req, res) => {
  try {
    const results = await minumanModels.getAllMinuman();
    res.json({
      messages: 'Berhasil mengambil data minuman',
      data: results,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data minuman',
      data: null,
      status: false
    });
  }
};

exports.getMinumanById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await minumanModels.getMinumanById(id);
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data minuman',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data minuman tidak ditemukan',
        data: null,
        status: false
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data minuman',
      data: null,
      status: false
    });
  }
};

exports.editMinuman = async (req, res) => {
  const id = req.params.id;
  let data = { ...req.body };
  if (req.file) {
    data.gambar = req.file.filename;
  }
  try {
    const result = await minumanModels.editMinuman(id, data);
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil mengedit data minuman',
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengedit data minuman',
      data: null,
      status: false
    });
  }
};

exports.deleteMinuman = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await minumanModels.deleteMinuman(id);
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil menghapus data minuman',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data minuman tidak ditemukan',
        data: null,
        status: false
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menghapus data minuman',
      data: null,
      status: false
    });
  }
};