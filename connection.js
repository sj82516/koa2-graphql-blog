const Mysql = require('mysql2');
const Bluebird = require('bluebird');

let connection = Mysql.createConnection({
    host: process.env.HOST, user: process.env.DB_USER, password: process.env.DB_PWD, database: process.env.DB_NAME
});

connection.execute = Bluebird.promisify(connection.execute);

export default connection;