const db = require('../db/config');

// Tambah makanan
exports.createMakanan = (data, callback) => {
  const query = `INSERT INTO makanan (nama, deskripsi, harga, kategori, stok, gambar) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    data.nama,
    data.deskripsi || null,
    data.harga,
    data.kategori,
    data.stok || 0,
    data.gambar || null
  ];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting makanan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Ambil semua makanan
exports.getAllMakanan = (callback) => {
  db.getConnection((err, connection) => {
    if (err) return callback(err, null);
    connection.query('SELECT * FROM makanan', (err, results) => {
      connection.release();
      if (err) return callback(err, null);
      callback(null, results);
    });
  });
};

// Ambil makanan by id
exports.getMakananById = (id, callback) => {
  db.query('SELECT * FROM makanan WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching makanan by id:', err);
      return callback(err, null);
    }
    callback(null, results[0] || null);
  });
};

// Edit makanan
exports.editMakanan = (id, data, callback) => {
  const fields = [];
  const values = [];
  if (data.nama) { fields.push('nama = ?'); values.push(data.nama); }
  if (data.deskripsi !== undefined) { fields.push('deskripsi = ?'); values.push(data.deskripsi); }
  if (data.harga) { fields.push('harga = ?'); values.push(data.harga); }
  if (data.kategori) { fields.push('kategori = ?'); values.push(data.kategori); }
  if (data.stok !== undefined) { fields.push('stok = ?'); values.push(data.stok); }
  if (data.gambar) { fields.push('gambar = ?'); values.push(data.gambar); }
  if (fields.length === 0) return callback(null, { affectedRows: 0 });
  const query = `UPDATE makanan SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating makanan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Hapus makanan
exports.deleteMakanan = (id, callback) => {
  db.query('DELETE FROM makanan WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting makanan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};
