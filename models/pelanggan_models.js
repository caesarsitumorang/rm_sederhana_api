const database = require('../db/config.js');

exports.getPelangganById = (id, callback) => {
  const query = 'SELECT * FROM pelanggan WHERE id = ?';
  database.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching pelanggan by id:', err);
      return callback(err, null);
    }
    callback(null, results[0] || null);
  });
}

exports.deletePelanggan = (id, callback) => {
  const query = 'DELETE FROM pelanggan WHERE id = ?';
  database.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting pelanggan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
}


exports.editPelanggan = (id, data, callback) => {
  // Buat array field dan value yang akan diupdate
  const fields = [];
  const values = [];
  if (data.username) {
    fields.push('username = ?');
    values.push(data.username);
  }
  if (data.password) {
    fields.push('password = ?');
    values.push(data.password);
  }
  if (data.nama_lengkap) {
    fields.push('nama_lengkap = ?');
    values.push(data.nama_lengkap);
  }
  if (data.email) {
    fields.push('email = ?');
    values.push(data.email);
  }
  if (data.foto) {
    fields.push('foto = ?');
    values.push(data.foto);
  }
  if (data.no_hp) {
    fields.push('no_hp = ?');
    values.push(data.no_hp);
  }
  if (data.latitude) {
    fields.push('latitude = ?');
    values.push(data.latitude);
  }
  if (data.longitude) {
    fields.push('longitude = ?');
    values.push(data.longitude);
  }
  if (data.detail_alamat) {
    fields.push('detail_alamat = ?');
    values.push(data.detail_alamat);
  }
  if (fields.length === 0) {
    // Tidak ada field yang diupdate
    return callback(null, { affectedRows: 0 });
  }
  const query = `UPDATE pelanggan SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating pelanggan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
}

exports.getAllPelanggan = (callback) => {
  const query = 'SELECT * FROM pelanggan';
  database.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pelanggan:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
}

// Model untuk input data pelanggan baru
exports.createPelanggan = (data, callback) => {
  const query = `INSERT INTO pelanggan (username, password, nama_lengkap, email, foto, no_hp, latitude, longitude, detail_alamat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.username,
    data.password,
    data.nama_lengkap,
    data.email,
    data.foto || null,
    data.no_hp || null,
    data.latitude || null,
    data.longitude || null,
    data.detail_alamat || null
  ];
  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting pelanggan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
}