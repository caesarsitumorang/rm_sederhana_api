const db = require('../db/config');

// Tambah admin
exports.createAdmin = async (data) => {
  try {
    const connection = await db.getConnection();
    const query = `INSERT INTO admin (username, password, nama_lengkap, email) VALUES (?, ?, ?, ?)`;
    const values = [
      data.username,
      data.password,
      data.nama_lengkap,
      data.email
    ];
    const [result] = await connection.query(query, values);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

// Ambil semua admin
exports.getAllAdmin = async () => {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query('SELECT * FROM admin');
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

// Ambil admin by id
exports.getAdminById = async (id) => {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query('SELECT * FROM admin WHERE id = ?', [id]);
    connection.release();
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

// Edit admin
exports.editAdmin = async (id, data) => {
  try {
    const connection = await db.getConnection();
    const fields = [];
    const values = [];
    if (data.username) { fields.push('username = ?'); values.push(data.username); }
    if (data.password) { fields.push('password = ?'); values.push(data.password); }
    if (data.nama_lengkap) { fields.push('nama_lengkap = ?'); values.push(data.nama_lengkap); }
    if (data.email) { fields.push('email = ?'); values.push(data.email); }
    if (fields.length === 0) return { affectedRows: 0 };
    const query = `UPDATE admin SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    const [result] = await connection.query(query, values);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus admin
exports.deleteAdmin = async (id) => {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query('DELETE FROM admin WHERE id = ?', [id]);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};