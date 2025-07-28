const warungModels = require('../../models/warung_models');

exports.createWarung = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.foto_profil = req.file.filename;
  if (!data.nama_warung) {
    return res.status(400).json({
      messages: 'nama_warung wajib diisi',
      data: null,
      status: false
    });
  }
  try {
    const result = await warungModels.createWarung(data);
    res.json({
      messages: 'Berhasil menambah warung',
      data: result,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menambah warung',
      data: null,
      status: false
    });
  }
};

exports.getAllWarung = async (req, res) => {
  try {
    const results = await warungModels.getAllWarung();
    res.json({
      messages: 'Berhasil mengambil data warung',
      data: results,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data warung',
      data: null,
      status: false
    });
  }
};

exports.getWarungById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await warungModels.getWarungById(id);
    if (result) {
      res.json({
        messages: 'Berhasil mengambil data warung',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data warung tidak ditemukan',
        data: null,
        status: false
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengambil data warung',
      data: null,
      status: false
    });
  }
};

exports.editWarung = async (req, res) => {
  const id = req.params.id;
  const data = { ...req.body };
  if (req.file) data.foto_profil = req.file.filename;
  try {
    const result = await warungModels.editWarung(id, data);
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil mengedit data warung',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data warung tidak ditemukan',
        data: null,
        status: false
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal mengedit data warung',
      data: null,
      status: false
    });
  }
};

exports.deleteWarung = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await warungModels.deleteWarung(id);
    if (result.affectedRows > 0) {
      res.json({
        messages: 'Berhasil menghapus data warung',
        data: result,
        status: true
      });
    } else {
      res.status(404).json({
        messages: 'Data warung tidak ditemukan',
        data: null,
        status: false
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Gagal menghapus data warung',
      data: null,
      status: false
    });
  }
};