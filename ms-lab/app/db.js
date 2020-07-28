'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    //host     : 'elixir-database.cpk5os1tibib.ap-south-1.rds.amazonaws.com',
    user     : 'root',
    //user     : 'elixir',
    password : '',
    //password : 'Toofani58',
    database : 'elixir'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;