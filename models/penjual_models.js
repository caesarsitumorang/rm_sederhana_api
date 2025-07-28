const db = require('../db/config');

// Tambah penjual
exports.createPenjual = async (data) => {
  try {
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
    const [result] = await db.query(query, values);
    return result;
  } catch (err) {
    throw err;
  }
};

// Ambil semua penjual
exports.getAllPenjual = async () => {
  try {
    const [results] = await db.query('SELECT * FROM penjual');
    return results;
  } catch (err) {
    throw err;
  }
};

// Ambil penjual by id
exports.getPenjualById = async (id) => {
  try {
    const [results] = await db.query('SELECT * FROM penjual WHERE id = ?', [id]);
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

// Edit penjual
exports.editPenjual = async (id, data) => {
  try {
    const fields = [];
    const values = [];
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    });
    if (fields.length === 0) return { affectedRows: 0 };
    const query = `UPDATE penjual SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    const [result] = await db.query(query, values);
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus penjual
exports.deletePenjual = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM penjual WHERE id = ?', [id]);
    return result;
  } catch (err) {
    throw err;
  }
};