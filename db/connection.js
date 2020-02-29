const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Abc!1234",
    database: "employees",
    multipleStatements: true
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;