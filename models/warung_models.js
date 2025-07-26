const db = require('../db/config');

exports.createWarung = (data, callback) => {
  const query = `INSERT INTO info_warung (
    nama_warung, pemilik, no_hp, email, alamat, deskripsi,
    nama_bank_warung, nomor_rekening_warung, jam_buka, jam_tutup,
    latitude, longitude, foto_profil
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.nama_warung,
    data.pemilik || null,
    data.no_hp || null,
    data.email || null,
    data.alamat || null,
    data.deskripsi || null,
    data.nama_bank_warung || null,
    data.nomor_rekening_warung || null,
    data.jam_buka || null,
    data.jam_tutup || null,
    data.latitude || null,
    data.longitude || null,
    data.foto_profil || null
  ];
  db.query(query, values, callback);
};

exports.getAllWarung = (callback) => {
  db.query('SELECT * FROM info_warung', callback);
};

exports.getWarungById = (id, callback) => {
  db.query('SELECT * FROM info_warung WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0] || null);
  });
};

exports.editWarung = (id, data, callback) => {
  const fields = [];
  const values = [];
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  });
  if (fields.length === 0) return callback(null, { affectedRows: 0 });
  const query = `UPDATE info_warung SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  db.query(query, values, callback);
};

exports.deleteWarung = (id, callback) => {
  db.query('DELETE FROM info_warung WHERE id = ?', [id], callback);
};