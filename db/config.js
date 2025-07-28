const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'db_rm_sederhana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
//   console.log('Connected to the database');
// });

module.exports = db;
