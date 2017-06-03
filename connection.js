const Mysql = require('mysql2');
const Bluebird = require('bluebird');

let connection = Mysql.createConnection({
    host: 'localhost', user: 'root', password: 'helloworld', database: 'test'
});

connection.execute = Bluebird.promisify(connection.execute);

export default connection;