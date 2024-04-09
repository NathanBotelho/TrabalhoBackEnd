const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');
/* GET home page. */
router.get('/', function (req, res, next) {
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '159753',
    database: 'back1-express-mysql',
    port: 3308
  }).then((connection) => {
    connection.query('SELECT * FROM clientes;')
  .then((result) => { res.send(result[0]); });
  }).then((connection) => {
    connection.query('SELECT * FROM clientes;')
  .then((result) => { res.send(result[0]); });
  });


});
module.exports = router;