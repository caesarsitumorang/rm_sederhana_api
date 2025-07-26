const db = require('../../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'rahasia_super_aman';

exports.loginPelanggan = (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({
      messages: 'Username dan password harus diisi',
      data: null,
      status: false
    });
  }
  db.query('SELECT * FROM pelanggan WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({
        messages: 'Terjadi kesalahan pada server',
        data: null,
        status: false
      });
    }
    if (results.length === 0) {
      return res.status(401).json({
        messages: 'Username tidak ditemukan',
        data: null,
        status: false
      });
    }
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        messages: 'Password salah',
        data: null,
        status: false
      });
    }
    // Jangan kirim password ke client
    delete user.password;

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username },JWT_SECRET, {
      expiresIn: '7d', // token berlaku selama 7 hari
    });

    res.json({
      messages: 'Anda berhasil login',
      data: user,
      token: token,
      status: true
    });
  });
}

