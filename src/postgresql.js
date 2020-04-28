// PostgreSQL integration
// install postgres module
// npm install pg --save

const pg = require('pg')
const connectionString = "pg://postgres:postgres@localhost:5432/students";
const client = new pg.Client(connectionString);
client.connect();

// query with connection object
const queryString = "SELECT name, age FROM students";
const query = client.query(queryString);


query.on('row', (row, result)=> {
    result.addRow(row);
});

query.on('end', function(result){
    // logic
})
