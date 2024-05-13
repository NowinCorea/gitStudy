let mysql = require('mysql2');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'mmkr4934',
    password: 'qlalfqjsgh1!',
    database: 'quizdb'
});
db.connect();

module.exports = db;