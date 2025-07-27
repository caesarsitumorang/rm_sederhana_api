const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '103.163.138.21',
  user: 'tempakod_caesar',
  password: 'caesar',
  database: 'tempakod_db_rm_sederhana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
