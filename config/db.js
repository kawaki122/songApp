const mysql = require('mysql');
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: process.env.DB_NAME,
    multipleStatements: true
});
// connect to database
dbConn.connect();

module.exports = dbConn;