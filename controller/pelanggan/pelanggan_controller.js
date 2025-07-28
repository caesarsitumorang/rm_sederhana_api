const pelangganModels = require('../../models/pelanggan_models.js');
const bcrypt = require('bcrypt');

exports.getPelangganById = async (req, res) => {
  const id = req.params.id || (req.user && req.user.id);
  try {
    const result = await pelangganModels.getPelangganById(id);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data pelanggan',
      data: null,
      status: false
    });
  }
};

exports.getAllPelanggan = async (req, res) => {
  try {
    const results = await pelangganModels.getAllPelanggan();
    res.json({
      messages: 'Berhasil mengambil data pelanggan',
      data: results,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data pelanggan',
      data: null,
      status: false
    });
  }
};

exports.createPelanggan = async (req, res) => {
  const body = req.body || {};
  const { username, password, nama_lengkap, email, no_hp, latitude, longitude, detail_alamat } = body;
  let foto = null;
  if (req.file) {
    foto = req.file.filename;
  }
  if (!username || !password || !nama_lengkap || !email || !no_hp) {
    return res.status(400).json({
      messages: 'Semua field harus diisi',
      data: null,
      status: false
    });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const dataToSave = { ...body, password: hashedPassword, latitude, longitude, detail_alamat, foto };
    const result = await pelangganModels.createPelanggan(dataToSave);
    res.json({
      messages: 'Berhasil menambahkan data pelanggan',
      data: result,
      status: true
    });
  } catch (error) {
    res.status(500).json({
      messages: 'Gagal menambahkan data pelanggan',
      data: null,
      status: false
    });
  }
};

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
  try {
    const result = await pelangganModels.editPelanggan(id, updateData);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengedit data pelanggan',
      data: null,
      status: false
    });
  }
};

exports.deletePelanggan = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pelangganModels.deletePelanggan(id);
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
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menghapus data pelanggan',
      data: null,
      status: false
    });
  }
};