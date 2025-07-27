const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '103.163.138.21',
  user: 'tempakod_caesar',
  password: 'caesar',
  database: 'tempakod_db_rm_sederhana',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;