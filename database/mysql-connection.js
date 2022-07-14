var mysql = require("mysql");
const Log = require('../log')
var connection = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "password",
    database: "logist",
    // port: 25060,
    multipleStatements: true
});


connection.connect(function(err) {
    if (err) {
        Log.error(`An Error while trying to connect to databse ==> ${err}`)
        throw err;
    }
    Log.info(`Connected`)
});
module.exports = connection;