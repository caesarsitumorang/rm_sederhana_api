const path = require('path');
const express = require('express');
const { put } = require('@vercel/blob');
const formidable = require('formidable');
const fs = require('fs/promises');
require('dotenv').config(); // agar .env bisa dibaca

const { put } = require('@vercel/blob'); // sekarang ini akan pakai token dari .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const pelangganRoutes = require('./routes/pelanggan_routes');
const loginRoutes = require('./routes/login_routes');
const makananRoutes = require('./routes/makanan_routes');
const minumanRoutes = require('./routes/minuman_routes');
const pesananRoutes = require('./routes/pesanan_routes');
const adminRoutes = require('./routes/admin_routes');
const warungRoutes = require('./routes/warung_routes');
const penjualanRoutes = require('./routes/penjual_routes');

// Static file (jika tetap butuh untuk menampilkan file lokal)
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// API Routes
app.use('/api', pelangganRoutes);
app.use('/api', loginRoutes);
app.use('/api', makananRoutes);
app.use('/api', minumanRoutes);
app.use('/api', pesananRoutes);
app.use('/api', adminRoutes);
app.use('/api', warungRoutes);
app.use('/api', penjualanRoutes);

// ✅ Upload Route (Vercel-compatible)
app.post('/api/upload', (req, res) => {
  const form = formidable({
    multiples: false,
    uploadDir: '/tmp',          // ✅ folder writable di Vercel
    keepExtensions: true        // agar .jpg, .png tetap ada
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      return res.status(500).json({ error: 'Gagal memproses form upload' });
    }

    try {
      const file = files.file;
      const buffer = await fs.readFile(file.filepath);

      const blob = await put(file.originalFilename, buffer, {
        access: 'public', // atau 'private' jika perlu
      });

      res.status(200).json({ url: blob.url });
    } catch (error) {
      console.error('Upload gagal:', error);
      res.status(500).json({ error: 'Upload gagal' });
    }
  });
});

// Tes route
app.get('/', (req, res) => {
  res.send('Halo, Node.js berjalan!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
