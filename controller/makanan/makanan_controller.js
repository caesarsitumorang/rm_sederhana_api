const makananModels = require('../../models/makanan_models');
const { put } = require('@vercel/blob');

exports.createMakanan = async (req, res) => {
  const { nama, deskripsi, harga, kategori, stok } = req.body || {};
  let gambar = null;

  if (req.file) {
    try {
      const blob = await put(req.file.originalname, req.file.buffer, {
        access: 'public'
      });
      gambar = blob.url; // ✅ gunakan URL dari Vercel Blob
    } catch (err) {
      return res.status(500).json({
        messages: 'Gagal upload gambar',
        data: null,
        status: false
      });
    }
  }

  if (!nama || !harga || !kategori) {
    return res.status(400).json({
      messages: 'Nama, harga, dan kategori wajib diisi',
      data: null,
      status: false
    });
  }

  const data = { nama, deskripsi, harga, kategori, stok, gambar };

  try {
    const result = await makananModels.createMakanan(data);
    res.json({
      messages: 'Berhasil menambah makanan',
      data: result,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menambah makanan',
      data: null,
      status: false
    });
  }
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
    res.status(500).json({
      messages: 'Gagal mengambil data makanan',
      data: null,
      status: false
    });
  }
};

exports.getMakananById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await makananModels.getMakananById(id);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data makanan',
      data: null,
      status: false
    });
  }
};

exports.editMakanan = async (req, res) => {
  const id = req.params.id;
  let data = { ...req.body };

  if (req.file) {
    try {
      const blob = await put(req.file.originalname, req.file.buffer, {
        access: 'public'
      });
      data.gambar = blob.url; // ✅ simpan URL gambar
    } catch (err) {
      return res.status(500).json({
        messages: 'Gagal upload gambar',
        data: null,
        status: false
      });
    }
  }

  try {
    const result = await makananModels.editMakanan(id, data);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengedit data makanan',
      data: null,
      status: false
    });
  }
};


exports.deleteMakanan = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await makananModels.deleteMakanan(id);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menghapus data makanan',
      data: null,
      status: false
    });
  }
};