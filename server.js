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
const os = require('os');


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
  const publicIpAddress = getPublicIp();

  if (publicIpAddress) {
    console.log('Alamat IP Publik:', publicIpAddress);
  } else {
    console.log('Tidak dapat menemukan alamat IP publik.');
  }
  res.send(`Halo Node.js berjalan! ${publicIpAddress}`  );
});

function getPublicIp() {
  const networkInterfaces = os.networkInterfaces();
  let publicIp = null;

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];

    for (const iface of interfaces) {
      // Skip internal (loopback) and inactive interfaces
      if ('IPv4' !== iface.family || !iface.internal) {
        publicIp = iface.address;
        break; // Get the first non-internal IPv4 address
      }
    }
    if (publicIp) {
      break;
    }
  }

  return publicIp;
}

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
