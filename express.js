/*
    *This examples contains in NodeJSNotesForProfessional
    *simple examples for initialize simple server with express
    *this file contains examples for study and pratice the NodeJS applications

*/
// Simple express server
const express = require('express');
const app = express();

app.get('/ping', (request, response) => {
    response.send('pong');
});

app.listen(3000, 'localhost');



// Basic routing
const express = require('express');
const app = express();

app.get('/products', function (req, res, next) {});
app.post('/products', function (req, res, next) {});
app.put('/products/:id', function (req, res, next) {});
app.delete('/products/:id', function (req, res, next) {});

// or

app.route('/products')
    .get(function (req, res, next) {})
    .post(function (req, res, next) {})
    .put(function (req, res, next) {})



// Modular express application
// greet.js
const express = require('express');

module.exports = function(options = {}) {
    const router = express.Router();

    router.get('/greet', (req, res, next) => {
        res.end(options.greeting);
    });

    return router;
};

// Aplication
// index.js
const express = require('express');
const greetMiddleware = require('./greet.js');

express()
    .use('/api/v1', greetMiddleware({ greeting:'Hello world'}))
    .listen(8080);

// When accessing http://<hostname>:8080/api/v1/greet the output will be Hello world



// Using Template Engine
const express = require('express');
const app = express();

const PORT = 3000;

app.set('view engine', 'jade');
app.set('views', 'src/views');

app.get('/', function(req, res){
    res.render('index');
});

app.listen(PORT, function(err) {
    if(!err) {
        console.log('Server is running ar port', PORT);
    } else {
        console.log(JSON.stringify(err));
    }
});



// JSON API with ExpressJS
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());    // for all routes

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    var info = {
        'string_value': 'StackOverflow',
        'number_value': 8888
    }

    res.json(info);  // res.status(200).json(info) add a status code to json response
})

app.listen(port, function() {
    console.log('App listening on port' + port)
})



// Request body with body-parser
const app = require(express)();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
    PUT /settings/32132
    {
        "name": "Peter Parker"
    }

    req.body.name 
    req.cookies.name
*/



// Setting cookies with cookie-parser
var app = require('express')();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/setcookie', (req, res) => {
    res.cookie('username', 'john doe', { maxAge: 900000, httpOnly: true});
    return res.send('Cookie has been set');
});

app.get('/getcookie', (req, res) => {
    var username = req.cookies['username'];
    if(username) {
        return res.send(username);
    }

    return res.send('No cookie found');
});

app.listen(3000);



// Hello world using middleware for page not found
'use strict';

const port = process.env.PORT || 3000;

var app = require('express')();
    app.listen(port);

app.get('/', (req, res)=> res.send('Hello World!'));
app.get('/wiki', (req, res)=> res.send('This is wiki page.'));
app.use((req, res)=> res.send('404-PageNotFound'));




