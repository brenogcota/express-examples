// Connect to MongoDB using mongoose
// npm install mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
    request: String,
    time: Number
}, {
    collection: 'collectionName'
});

// create a model
const Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://localhost:27017/dbName');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});



// Find data in Mongo db using mongoose and express
// npm install express cors mongoose

const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaName = new Schema({
    request: String,
    time: Number
}, {
    collection: 'collectionName'
});

const Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://localhost:27017/dbName');

const port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

app.get('/find/:query', cors(), function(req, res) {
    const query = req.params.query;

    Model.find({
        'request': query
    }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error: 'Error'
            }))
        }
    })
})


// Save data to mongoDB
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const app = express();

const schemaName = new Schema({
    request: String,
    time: Number
}, {
    collection: 'collectionName'
});

const Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://localhost:27017/dbName');

const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

// express routes

app.get('/save/:query', cors(), function(req, res) {
    const query = req.params.query;

    const savedata = new Model({
        'request': query,
        'time': Math.floor(Date.now() / 1000)
    }).save(function(err, result){
        if (err) throw err;

        if (result) {
            res.json(result)
        }
    })
})



// basic Schema
const strConnection = 'mongodb://localhost:27017/dbName'; 
const db = mongoose.createConnection(strConnection)


const Schema = require('mongoose').Schema;
const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const usersModel = db.model('users', usersSchema);
module.exports = usersModel;



// Useful mongoose functions

doc.find({'some.value': 5}, function(err, docs){
    // returns array docs
});

doc.findOne({'some.value': 5}, function(err, doc){
    // return document doc
})

doc.findById(obj._id, function(err, doc){
    // return document doc by id
})