const pesananModels = require('../../models/pesanan_models');

exports.createPesanan = (req, res) => {
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
  console.log('📥 Body yang diterima:', req.body);


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
    detail, // ← kirim langsung ke model
  };

  pesananModels.createPesanan(data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menambah pesanan',
        data: null,
        status: false,
      });
    }
    res.json({
      messages: 'Berhasil menambah pesanan',
      data: result,
      status: true,
    });
  });
};


exports.getAllPesanan = (req, res) => {
  pesananModels.getAllPesanan((err, results) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data pesanan',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil mengambil data pesanan',
      data: results,
      status: true
    });
  });
};

exports.getPesananById = (req, res) => {
  const id = req.params.id;
  pesananModels.getPesananById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data pesanan',
        data: null,
        status: false
      });
    }
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
  });
};

exports.editPesanan = (req, res) => {
  const id = req.params.id;
  let data = { ...req.body };
  if (req.file) {
    data.bukti_pembayaran = req.file.filename;
  }
  pesananModels.editPesanan(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengedit data pesanan',
        data: null,
        status: false
      });
    }
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
  });
};

exports.deletePesanan = (req, res) => {
  const id = req.params.id;
  pesananModels.deletePesanan(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menghapus data pesanan',
        data: null,
        status: false
      });
    }
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
  });
};
