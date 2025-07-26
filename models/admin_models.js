const db = require('../db/config');

// Tambah admin
exports.createAdmin = (data, callback) => {
  const query = `INSERT INTO admin (username, password, nama_lengkap, email) VALUES (?, ?, ?, ?)`;
  const values = [
    data.username,
    data.password,
    data.nama_lengkap,
    data.email
  ];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting admin:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Ambil semua admin
exports.getAllAdmin = (callback) => {
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      console.error('Error fetching admin:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Ambil admin by id
exports.getAdminById = (id, callback) => {
  db.query('SELECT * FROM admin WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching admin by id:', err);
      return callback(err, null);
    }
    callback(null, results[0] || null);
  });
};

// Edit admin
exports.editAdmin = (id, data, callback) => {
  const fields = [];
  const values = [];
  if (data.username) { fields.push('username = ?'); values.push(data.username); }
  if (data.password) { fields.push('password = ?'); values.push(data.password); }
  if (data.nama_lengkap) { fields.push('nama_lengkap = ?'); values.push(data.nama_lengkap); }
  if (data.email) { fields.push('email = ?'); values.push(data.email); }
  if (fields.length === 0) return callback(null, { affectedRows: 0 });
  const query = `UPDATE admin SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating admin:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Hapus admin
exports.deleteAdmin = (id, callback) => {
  db.query('DELETE FROM admin WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting admin:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};
