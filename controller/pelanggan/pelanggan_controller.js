const pelangganModels = require('../../models/pelanggan_models.js');
const bcrypt = require('bcrypt');


exports.getPelangganById = (req, res) => {
   const { id } = req.user; // Ambil dari token
  pelangganModels.getPelangganById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data pelanggan',
        data: null,
        status: false
      });
    }
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data pelanggan',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data pelanggan tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
}
// Controller untuk hapus data pelanggan
exports.deletePelanggan = (req, res) => {
  const id = req.params.id;
  pelangganModels.deletePelanggan(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menghapus data pelanggan',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil menghapus data pelanggan',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data pelanggan tidak ditemukan',
        data: null,
        status: false
      });
    }
  });
}

exports.editPelanggan = async (req, res) => {
  const id = req.params.id;
  let data = req.body || {};
  if (data.password) {
    try {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    } catch (error) {
      return res.status(500).json({
        messages: 'Gagal hash password',
        data: null,
        status: false
      });
    }
  }
  if (req.file) {
    data.foto = req.file.filename;
  }
  const updateData = {
    ...data,
    latitude: data.latitude,
    longitude: data.longitude,
    detail_alamat: data.detail_alamat,
    foto: data.foto
  };
  pelangganModels.editPelanggan(id, updateData, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengedit data pelanggan',
        data: null,
        status: false
      });
    }
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil mengedit data pelanggan',
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
}
exports.getAllPelanggan = (req, res) => {
  pelangganModels.getAllPelanggan((err, results) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data pelanggan',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil mengambil data pelanggan',
      data: results,
      status: true
    });
  });
}

// Controller untuk input data pelanggan baru
exports.createPelanggan = async (req, res) => {
  const body = req.body || {};
  const { username, password, nama_lengkap, email, no_hp, latitude, longitude, detail_alamat } = body;
  let foto = null;
  if (req.file) {
    foto = req.file.filename;
  }
  if (!username || !password || !nama_lengkap || !email  || !no_hp) {
    return res.status(400).json({
      messages: 'Semua field harus diisi',
      data: null,
      status: false
    });
  }
  try {
    // Hash password sebelum simpan
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const dataToSave = { ...body, password: hashedPassword, latitude, longitude, detail_alamat, foto };
    pelangganModels.createPelanggan(dataToSave, (err, result) => {
      if (err) {
        return res.status(500).json({
          messages: 'Gagal menambahkan data pelanggan',
          data: null,
          status: false
        });
      }
      res.json({
        messages: 'Berhasil menambahkan data pelanggan',
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
}