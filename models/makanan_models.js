const db = require('../db/config');

// Tambah makanan
exports.createMakanan = async (data) => {
  try {
    const connection = await db.getConnection();
    const query = `INSERT INTO makanan (nama, deskripsi, harga, kategori, stok, gambar) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      data.nama,
      data.deskripsi || null,
      data.harga,
      data.kategori,
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

// Ambil semua makanan
exports.getAllMakanan = async () => {
  try {
    const connection = await db.getConnection();
    const [data] = await connection.query('SELECT * FROM makanan');
    connection.release();
    return data;
  } catch (err) {
    throw err;
  }
};

// Ambil makanan by id
exports.getMakananById = async (id) => {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query('SELECT * FROM makanan WHERE id = ?', [id]);
    connection.release();
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

// Edit makanan
exports.editMakanan = async (id, data) => {
  try {
    const connection = await db.getConnection();
    const fields = [];
    const values = [];
    if (data.nama) { fields.push('nama = ?'); values.push(data.nama); }
    if (data.deskripsi !== undefined) { fields.push('deskripsi = ?'); values.push(data.deskripsi); }
    if (data.harga) { fields.push('harga = ?'); values.push(data.harga); }
    if (data.kategori) { fields.push('kategori = ?'); values.push(data.kategori); }
    if (data.stok !== undefined) { fields.push('stok = ?'); values.push(data.stok); }
    if (data.gambar) { fields.push('gambar = ?'); values.push(data.gambar); }
    if (fields.length === 0) return { affectedRows: 0 };
    const query = `UPDATE makanan SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    const [result] = await connection.query(query, values);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus makanan
exports.deleteMakanan = async (id) => {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query('DELETE FROM makanan WHERE id = ?', [id]);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};