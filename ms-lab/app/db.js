'user strict';
var config = require('../../config.json');
var mysql = require('mysql');

//local mysql db connection

//log_in(config.username, config.password);
var connection = mysql.createConnection({
    host     : config.db.server,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.db
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;