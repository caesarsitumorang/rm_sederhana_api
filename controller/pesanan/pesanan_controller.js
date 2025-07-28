const pesananModels = require('../../models/pesanan_models');

exports.createPesanan = async (req, res) => {
  const {
    id_pelanggan,
    tanggal_pesanan,
    ongkir,
    total_harga,
    status,
    catatan,
    latitude,
    longitude,
    detail_alamat,
    detail // <--- array dari makanan/minuman yang dipesan
  } = req.body || {};

  let bukti_pembayaran = null;
  if (req.file) {
    bukti_pembayaran = req.file.filename;
  }
  // Validasi
  if (!id_pelanggan || !total_harga) {
    return res.status(400).json({
      messages: 'id_pelanggan dan total_harga wajib diisi',
      data: null,
      status: false,
    });
  }
  if (!Array.isArray(detail) || detail.length === 0) {
    return res.status(400).json({
      messages: 'Minimal satu detail makanan atau minuman harus disertakan',
      data: null,
      status: false,
    });
  }
  const data = {
    id_pelanggan,
    tanggal_pesanan,
    ongkir,
    total_harga,
    status,
    catatan: catatan || null,
    bukti_pembayaran,
    latitude,
    longitude,
    detail_alamat,
    detail,
  };
  try {
    const result = await pesananModels.createPesanan(data);
    res.json({
      messages: 'Berhasil menambah pesanan',
      data: result,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menambah pesanan',
      data: null,
      status: false,
    });
  }
};

exports.getAllPesanan = async (req, res) => {
  try {
    const results = await pesananModels.getAllPesanan();
    res.json({
      messages: 'Berhasil mengambil data pesanan',
      data: results,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data pesanan',
      data: null,
      status: false
    });
  }
};

exports.getPesananById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pesananModels.getPesananById(id);
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data pesanan',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data pesanan tidak ditemukan',
        data: null,
        status: false
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data pesanan',
      data: null,
      status: false
    });
  }
};

exports.editPesanan = async (req, res) => {
  const id = req.params.id;
  let data = { ...req.body };
  if (req.file) {
    data.bukti_pembayaran = req.file.filename;
  }
  try {
    const result = await pesananModels.editPesanan(id, data);
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil mengedit data pesanan',
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
      messages: 'Gagal mengedit data pesanan',
      data: null,
      status: false
    });
  }
};

exports.deletePesanan = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pesananModels.deletePesanan(id);
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil menghapus data pesanan',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data pesanan tidak ditemukan',
        data: null,
        status: false
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menghapus data pesanan',
      data: null,
      status: false
    });
  }
};