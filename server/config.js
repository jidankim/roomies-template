import mysql from 'mysql';
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'roomie',
  database: 'ROOMIE'
});

pool.getConnection = callback => {
  pool.getConnection((err, connection) => {
    callback(err, connection);
  })
};

export default pool;
