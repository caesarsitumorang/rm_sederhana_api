const warungModels = require('../../models/warung_models');

exports.createWarung = (req, res) => {
  const data = { ...req.body };
  if (req.file) data.foto_profil = req.file.filename;
  if (!data.nama_warung) {
    return res.status(400).json({
      messages: 'nama_warung wajib diisi',
      data: null,
      status: false
    });
  }
  warungModels.createWarung(data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menambah warung',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil menambah warung',
      data: result,
      status: true
    });
  });
};

exports.getAllWarung = (req, res) => {
  warungModels.getAllWarung((err, results) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data warung',
        data: null,
        status: false
      });
    }
    res.json({
      messages: 'Berhasil mengambil data warung',
      data: results,
      status: true
    });
  });
};

exports.getWarungById = (req, res) => {
  const id = req.params.id;
  warungModels.getWarungById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengambil data warung',
        data: null,
        status: false
      });
    }
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
  });
};

exports.editWarung = (req, res) => {
  const id = req.params.id;
  const data = { ...req.body };
  if (req.file) data.foto_profil = req.file.filename;
  warungModels.editWarung(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal mengedit data warung',
        data: null,
        status: false
      });
    }
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
  });
};

exports.deleteWarung = (req, res) => {
  const id = req.params.id;
  warungModels.deleteWarung(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        messages: 'Gagal menghapus data warung',
        data: null,
        status: false
      });
    }
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
  });
};