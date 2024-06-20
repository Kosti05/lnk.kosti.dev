const mysql = require('mysql');
const dbConfig = require('./dbConfig');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', connection.threadId);
});

module.exports = connection;
