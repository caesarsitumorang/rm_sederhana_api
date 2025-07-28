const db = require('../db/config');

// Tambah minuman
exports.createMinuman = async (data) => {
  try {
    const connection = await db.getConnection();
    const query = `INSERT INTO minuman (nama, deskripsi, harga, ukuran, stok, gambar) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      data.nama,
      data.deskripsi || null,
      data.harga,
      data.ukuran || null,
      data.stok || 0,
      data.gambar || null
    ];
    const [result] = await connection.query(query, values);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

// Ambil semua minuman
exports.getAllMinuman = async () => {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query('SELECT * FROM minuman');
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

// Ambil minuman by id
exports.getMinumanById = async (id) => {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query('SELECT * FROM minuman WHERE id = ?', [id]);
    connection.release();
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

// Edit minuman
exports.editMinuman = async (id, data) => {
  try {
    const connection = await db.getConnection();
    const fields = [];
    const values = [];
    if (data.nama) { fields.push('nama = ?'); values.push(data.nama); }
    if (data.deskripsi !== undefined) { fields.push('deskripsi = ?'); values.push(data.deskripsi); }
    if (data.harga) { fields.push('harga = ?'); values.push(data.harga); }
    if (data.ukuran) { fields.push('ukuran = ?'); values.push(data.ukuran); }
    if (data.stok !== undefined) { fields.push('stok = ?'); values.push(data.stok); }
    if (data.gambar) { fields.push('gambar = ?'); values.push(data.gambar); }
    if (fields.length === 0) return { affectedRows: 0 };
    const query = `UPDATE minuman SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    const [result] = await connection.query(query, values);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus minuman
exports.deleteMinuman = async (id) => {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query('DELETE FROM minuman WHERE id = ?', [id]);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};