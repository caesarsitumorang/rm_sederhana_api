const makananModels = require('../../models/makanan_models');

exports.createMakanan = (req, res) => {
  const { nama, deskripsi, harga, kategori, stok } = req.body || {};
  let gambar = null;
  if (req.file) {
    gambar = req.file.filename;
  }
  if (!nama || !harga || !kategori) {
    return res.status(400).json({
      messages: 'Nama, harga, dan kategori wajib diisi',
      data: null,
      status: false
    });
  }
  const data = { nama, deskripsi, harga, kategori, stok, gambar };
  makananModels.createMakanan(data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menambah makanan',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil menambah makanan',
      data: result,
      status: true
    });
  });
};

exports.getAllMakanan = async (req, res) => {
  try {
    const results = await makananModels.getAllMakanan();
    res.json({
      messages: 'Berhasil mengambil data makanan',
      data: results,
      status: true
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      messages: 'Gagal mengambil data makanan',
      data: null,
      status: false
    });
  }
};

exports.getMakananById = (req, res) => {
  const id = req.params.id;
  makananModels.getMakananById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data makanan',
        data: null,
        status: false
      });
    }
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data makanan',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data makanan tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
};

exports.editMakanan = (req, res) => {
  const id = req.params.id;
  let data = { ...req.body };
  if (req.file) {
    data.gambar = req.file.filename;
  }
  makananModels.editMakanan(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengedit data makanan',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil mengedit data makanan',
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

exports.deleteMakanan = (req, res) => {
  const id = req.params.id;
  makananModels.deleteMakanan(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menghapus data makanan',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil menghapus data makanan',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data makanan tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
};
