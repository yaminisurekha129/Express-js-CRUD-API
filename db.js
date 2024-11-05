const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mysql@2024",
    database:"userInfo",
});

module.exports = db;