const db = require('../db/config');

// Tambah minuman
exports.createMinuman = (data, callback) => {
  const query = `INSERT INTO minuman (nama, deskripsi, harga, ukuran, stok, gambar) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    data.nama,
    data.deskripsi || null,
    data.harga,
    data.ukuran || null,
    data.stok || 0,
    data.gambar || null
  ];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting minuman:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Ambil semua minuman
exports.getAllMinuman = (callback) => {
  db.query('SELECT * FROM minuman', (err, results) => {
    if (err) {
      console.error('Error fetching minuman:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Ambil minuman by id
exports.getMinumanById = (id, callback) => {
  db.query('SELECT * FROM minuman WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching minuman by id:', err);
      return callback(err, null);
    }
    callback(null, results[0] || null);
  });
};

// Edit minuman
exports.editMinuman = (id, data, callback) => {
  const fields = [];
  const values = [];
  if (data.nama) { fields.push('nama = ?'); values.push(data.nama); }
  if (data.deskripsi !== undefined) { fields.push('deskripsi = ?'); values.push(data.deskripsi); }
  if (data.harga) { fields.push('harga = ?'); values.push(data.harga); }
  if (data.ukuran) { fields.push('ukuran = ?'); values.push(data.ukuran); }
  if (data.stok !== undefined) { fields.push('stok = ?'); values.push(data.stok); }
  if (data.gambar) { fields.push('gambar = ?'); values.push(data.gambar); }
  if (fields.length === 0) return callback(null, { affectedRows: 0 });
  const query = `UPDATE minuman SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating minuman:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Hapus minuman
exports.deleteMinuman = (id, callback) => {
  db.query('DELETE FROM minuman WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting minuman:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};
