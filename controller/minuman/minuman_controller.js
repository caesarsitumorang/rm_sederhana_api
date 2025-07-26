const minumanModels = require('../../models/minuman_models');

exports.createMinuman = (req, res) => {
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
  minumanModels.createMinuman(data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menambah minuman',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil menambah minuman',
      data: result,
      status: true
    });
  });
};

exports.getAllMinuman = (req, res) => {
  minumanModels.getAllMinuman((err, results) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data minuman',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil mengambil data minuman',
      data: results,
      status: true
    });
  });
};

exports.getMinumanById = (req, res) => {
  const id = req.params.id;
  minumanModels.getMinumanById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data minuman',
        data: null,
        status: false
      });
    }
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
  });
};

exports.editMinuman = (req, res) => {
  const id = req.params.id;
  let data = { ...req.body };
  if (req.file) {
    data.gambar = req.file.filename;
  }
  minumanModels.editMinuman(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengedit data minuman',
        data: null,
        status: false
      });
    }
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
  });
};

exports.deleteMinuman = (req, res) => {
  const id = req.params.id;
  minumanModels.deleteMinuman(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menghapus data minuman',
        data: null,
        status: false
      });
    }
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
  });
};
