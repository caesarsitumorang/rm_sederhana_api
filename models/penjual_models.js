const db = require('../db/config');

exports.createPenjual = (data, callback) => {
  const query = `INSERT INTO penjual (nama, email, no_hp, jenis_kelamin, username, password, alamat)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.nama,
    data.email,
    data.no_hp,
    data.jenis_kelamin,
    data.username,
    data.password,
    data.alamat
  ];
  db.query(query, values, callback);
};

exports.getAllPenjual = (callback) => {
  db.query('SELECT * FROM penjual', callback);
};

exports.getPenjualById = (id, callback) => {
  db.query('SELECT * FROM penjual WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0] || null);
  });
};

exports.editPenjual = (id, data, callback) => {
  const fields = [];
  const values = [];
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  });
  if (fields.length === 0) return callback(null, { affectedRows: 0 });
  const query = `UPDATE penjual SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  db.query(query, values, callback);
};

exports.deletePenjual = (id, callback) => {
  db.query('DELETE FROM penjual WHERE id = ?', [id], callback);
};