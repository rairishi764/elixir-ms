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


connection.connect((err) => {

    if(!err)
        console.log('Database is connected!');
    else
        console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
    });
    

module.exports = connection;