const path = require('path');
const express = require('express');
const app = express();
const os = require('os');

// Gunakan PORT dari environment (penting untuk Vercel)
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Import semua route
const pelangganRoutes = require('./routes/pelanggan_routes');
const loginRoutes = require('./routes/login_routes');
const makananRoutes = require('./routes/makanan_routes');
const minumanRoutes = require('./routes/minuman_routes');
const pesananRoutes = require('./routes/pesanan_routes');
const adminRoutes = require('./routes/admin_routes');
const warungRoutes = require('./routes/warung_routes');
const penjualanRoutes = require('./routes/penjual_routes');

// Gunakan route dengan prefix /api
app.use('/api', pelangganRoutes);
app.use('/api', loginRoutes);
app.use('/api', makananRoutes);
app.use('/api', minumanRoutes);
app.use('/api', pesananRoutes);
app.use('/api', adminRoutes);
app.use('/api', warungRoutes);
app.use('/api', penjualanRoutes);

// Route root sederhana
app.get('/', (req, res) => {
  res.send('Halo, server berjalan di Vercel! ✅');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
