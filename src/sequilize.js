/*  ***Sequilize examples***
    // Installation //
        *npm install --save sequelize
        *install mysql and mariadb
        *npm install --save mysql
        *install postgresql
        *npm install --save pg pg-hstore
*/

// define Models
const config = {
    username: "database username",
    password: "database password",
    database: "database name",
    host: "database's host URL",
    dialect: "mysql" // Other options are postgres, sqlite, mariadb and mssql.
}

const Sequilize = require('sequelize');
const sequelize = new Sequilize(config);

sequelize.define('MyModel', {
    name: Sequilize.STRING,
    comment: Sequilize.TEXT,
    date: {
        type: Sequilize.DATE,
        allowNull: false
    }
});

// 