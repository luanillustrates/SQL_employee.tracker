const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
    {
        database: employee_db,
        user: root,
        password: process.env.DB_PASSWORD
    },
);

module.exports = connection;