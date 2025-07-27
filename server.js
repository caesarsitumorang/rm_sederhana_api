const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pelangganRoutes = require('./routes/pelanggan_routes');
const loginRoutes = require('./routes/login_routes');
const makananRoutes = require('./routes/makanan_routes');
const minumanRoutes = require('./routes/minuman_routes');
const pesananRoutes = require('./routes/pesanan_routes');
const adminRoutes = require('./routes/admin_routes');
const warungRoutes = require('./routes/warung_routes');
const penjualanRoutes = require('./routes/penjual_routes');


app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api', pelangganRoutes);
app.use('/api', loginRoutes);
app.use('/api', makananRoutes);
app.use('/api', minumanRoutes);
app.use('/api', pesananRoutes);
app.use('/api', adminRoutes);
app.use('/api', warungRoutes);
app.use('/api', penjualanRoutes);

app.get('/', (req, res) => {
  res.send('Halo, Node.js berjalan!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
