const db = require('../db/config');

// Tambah warung
exports.createWarung = async (data) => {
  const query = `INSERT INTO info_warung (
    nama_warung, pemilik, no_hp, email, alamat, deskripsi,
    nama_bank_warung, nomor_rekening_warung, jam_buka, jam_tutup,
    latitude, longitude, foto_profil, detail_alamat
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
    data.foto_profil || null,
    data.detail_alamat || null
  ];
  try {
    const [result] = await db.query(query, values);
    return result;
  } catch (err) {
    throw err;
  }
};

// Ambil semua warung
exports.getAllWarung = async () => {
  try {
    const [results] = await db.query('SELECT * FROM info_warung');
    return results;
  } catch (err) {
    throw err;
  }
};

// Ambil warung by id
exports.getWarungById = async (id) => {
  try {
    const [results] = await db.query('SELECT * FROM info_warung WHERE id = ?', [id]);
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

// Edit warung
exports.editWarung = async (id, data) => {
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
    const query = `UPDATE info_warung SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    const [result] = await db.query(query, values);
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus warung
exports.deleteWarung = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM info_warung WHERE id = ?', [id]);
    return result;
  } catch (err) {
    throw err;
  }
};