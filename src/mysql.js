// MySQL integration
// install and connect with mysql
// npm install --save mysql

const mysql      = require('mysql')
const connection = mysql.createConnection({
    host      : 'localhost',
    user      : 'me',
    password  : 'root',
    database  : 'database_schema'
})

connection.connect()

const username = 'aminadav'
const queryString = 'SELECT name, email from users where name = ?'
connection.query(queryString, [username], function(err, rows, fields){
    if (err) throw err;
    if (rows.length) {
        rows.forEach(function(row) {
            console.log(row.name, 'email addres is', row.email);
        })
    } else {
        console.log('There were no results.')
    }
})