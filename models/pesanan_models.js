const db = require('../db/config');

exports.createPesanan = (data, callback) => {
  const query = `
    INSERT INTO pesanan (
      id_pelanggan, tanggal_pesanan, ongkir, total_harga, status, catatan,
      bukti_pembayaran, latitude, longitude, detail_alamat
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  console.log('🔥 Ongkir dari frontend:', data.ongkir);
console.log('✅ Setelah Number():', Number(data.ongkir));

 const values = [
  data.id_pelanggan,
  data.tanggal_pesanan || new Date(),

  // ✅ Perbaiki ini:
  Number(data.ongkir) || 0,

  data.total_harga,
  data.status || 'pending',
  data.catatan || null,
  data.bukti_pembayaran || null,
  data.latitude || null,
  data.longitude || null,
  data.detail_alamat || null,
];


  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting pesanan:', err);
      return callback(err, null);
    }

    const insertedId = result.insertId;

    // Insert detail makanan & minuman
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

    db.query(detailQuery, [detailValues], (errDetail, resultDetail) => {
      if (errDetail) {
        console.error('Error inserting pesanan_detail:', errDetail);
        return callback(errDetail, null);
      }

      callback(null, {
        id_pesanan: insertedId,
        detail_inserted: resultDetail.affectedRows,
      });
    });
  });
};

exports.getAllPesanan = (callback) => {
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

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pesanan with detail:', err);
      return callback(err, null);
    }

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

    callback(null, Object.values(grouped));
  });
};



// Ambil pesanan by id
exports.getPesananById = (id, callback) => {
  db.query('SELECT * FROM pesanan WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching pesanan by id:', err);
      return callback(err, null);
    }
    callback(null, results[0] || null);
  });
};

// Edit pesanan
exports.editPesanan = (id, data, callback) => {
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
  if (fields.length === 0) return callback(null, { affectedRows: 0 });
  const query = `UPDATE pesanan SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating pesanan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Hapus pesanan
exports.deletePesanan = (id, callback) => {
  db.query('DELETE FROM pesanan WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting pesanan:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};
const database = require('../db/config');
