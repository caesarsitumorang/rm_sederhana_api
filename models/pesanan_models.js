const db = require('../db/config');

// Tambah pesanan
exports.createPesanan = async (data) => {
  try {
    const query = `
      INSERT INTO pesanan (
        id_pelanggan, tanggal_pesanan, ongkir, total_harga, status, catatan,
        bukti_pembayaran, latitude, longitude, detail_alamat
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.id_pelanggan,
      data.tanggal_pesanan || new Date(),
      Number(data.ongkir) || 0,
      data.total_harga,
      data.status || 'pending',
      data.catatan || null,
      data.bukti_pembayaran || null,
      data.latitude || null,
      data.longitude || null,
      data.detail_alamat || null,
    ];
    const [result] = await db.query(query, values);
    const insertedId = result.insertId;

    // Insert detail makanan & minuman jika ada
    if (Array.isArray(data.detail) && data.detail.length > 0) {
      const detailQuery = `
        INSERT INTO pesanan_detail (id_pesanan, id_makanan, id_minuman, jumlah)
        VALUES ?
      `;
      const detailValues = data.detail.map(item => [
        insertedId,
        item.id_makanan || null,
        item.id_minuman || null,
        item.jumlah || 1,
      ]);
      await db.query(detailQuery, [detailValues]);
    }

    return {
      id_pesanan: insertedId,
      status: true
    };
  } catch (err) {
    throw err;
  }
};

// Ambil semua pesanan
exports.getAllPesanan = async () => {
  try {
    const query = `
      SELECT 
        p.*,
        d.id AS detail_id,
        d.jumlah,
        m.nama AS nama_makanan,
        mn.nama AS nama_minuman
      FROM pesanan p
      LEFT JOIN pesanan_detail d ON p.id = d.id_pesanan
      LEFT JOIN makanan m ON d.id_makanan = m.id
      LEFT JOIN minuman mn ON d.id_minuman = mn.id
      ORDER BY p.id DESC
    `;
    const [results] = await db.query(query);

    const grouped = {};
    results.forEach((row) => {
      if (!grouped[row.id]) {
        grouped[row.id] = {
          id: row.id,
          id_pelanggan: row.id_pelanggan,
          ongkir: row.ongkir,
          tanggal_pesanan: row.tanggal_pesanan,
          total_harga: row.total_harga,
          status: row.status,
          catatan: row.catatan,
          bukti_pembayaran: row.bukti_pembayaran,
          latitude: row.latitude,
          longitude: row.longitude,
          detail_alamat: row.detail_alamat,
          detail_pesanan: [],
        };
      }
      if (row.detail_id) {
        if (row.nama_makanan) {
          grouped[row.id].detail_pesanan.push({
            nama: row.nama_makanan,
            jumlah: row.jumlah,
            jenis: 'makanan',
          });
        }
        if (row.nama_minuman) {
          grouped[row.id].detail_pesanan.push({
            nama: row.nama_minuman,
            jumlah: row.jumlah,
            jenis: 'minuman',
          });
        }
      }
    });

    return Object.values(grouped);
  } catch (err) {
    throw err;
  }
};

// Ambil pesanan by id
exports.getPesananById = async (id) => {
  try {
    const [results] = await db.query('SELECT * FROM pesanan WHERE id = ?', [id]);
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

// Edit pesanan
exports.editPesanan = async (id, data) => {
  try {
    const fields = [];
    const values = [];
    if (data.id_pelanggan) { fields.push('id_pelanggan = ?'); values.push(data.id_pelanggan); }
    if (data.id_makanan) { fields.push('id_makanan = ?'); values.push(data.id_makanan); }
    if (data.id_minuman) { fields.push('id_minuman = ?'); values.push(data.id_minuman); }
    if (data.tanggal_pesanan) { fields.push('tanggal_pesanan = ?'); values.push(data.tanggal_pesanan); }
    if (data.total_harga) { fields.push('total_harga = ?'); values.push(data.total_harga); }
    if (data.status) { fields.push('status = ?'); values.push(data.status); }
    if (data.catatan !== undefined) { fields.push('catatan = ?'); values.push(data.catatan); }
    if (data.bukti_pembayaran) { fields.push('bukti_pembayaran = ?'); values.push(data.bukti_pembayaran); }
    if (data.latitude) { fields.push('latitude = ?'); values.push(data.latitude); }
    if (data.longitude) { fields.push('longitude = ?'); values.push(data.longitude); }
    if (data.detail_alamat) { fields.push('detail_alamat = ?'); values.push(data.detail_alamat); }
    if (fields.length === 0) return { affectedRows: 0 };
    const query = `UPDATE pesanan SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    const [result] = await db.query(query, values);
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus pesanan
exports.deletePesanan = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM pesanan WHERE id = ?', [id]);
    return result;
  } catch (err) {
    throw err;
  }
};