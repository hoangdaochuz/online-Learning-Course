const mysql = require('mysql2/promise');

const db = {connection: null};

(async () => {
  // create the connection to database
  db.connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '280502',
    database: 'online-learning-course-db'
  });
  console.log('Database connected!');
})();


module.exports = db;