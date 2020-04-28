// Good pratices in coding
// basic program for signup

//index.js
const express  = require('express'),
      session  = require('express-session'),
      mongoose = require('mongoose'),
      request  = require('request');

const userRoutes = require('./app/routes/userRoutes');
const config = require('./app/config/config');

mongoose.connect(config.getDBString());

const app = express();

app.use(config.API_PATH, userRoutes());

app.listen(config.PORT);
console.log('Server started at - '+ config.URL + ':' + config.PORT);


//config.js
const config = {
    VERSION: 1,
    BULD: 1,
    URL: 'http://127.0.0.1',
    API_PATH: '/api',
    PORT: process.env.PORT || 8080,
    DB: {
        HOST: 'localhost',
        PORT: '27017',
        DATABASE: 'db'
    },

    getDBString: function() {
        return 'mongodb://'+ this.DB.HOST +':'+ this.DB.PORT +'/'+ this.DB.DATABASE;
    },

    getHTTPUrl: function() {
        return 'http://' + this.URL +':'+ this.PORT;
    }
}

module.exports = config;


// user.js 
/* 
    Model file where schema is defined 
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String
    }
});

// Define the model for User
const User;

if(mongoose.models.User)
    User = mongoose.model('User');
else
    User = mongoose.model('User', UserSchema);

module.exports = User;


// userController 

const User = require('../models/user');
const crypto = require('crypto');

const userController = {
    create: function(req, res) {
        const repassword = req.body,repassword;
        const password = req.body.password;
        const userEmail = req.body.email;

        User.find({"email": userEmail}, function(err, usr){
            if (usr.length > 0){
                res.json('Email already exists');
                return;
            }
            else {
                if (passowrd != repassword) {
                    res.json('Passwords does not match');
                }

                const shasum = crypto.createHash('sha1');
                shasum.update(req.body.password);
                const passwordHash = shasum.digest('hex');

                // create User
                const user = new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.passowrd = req.body.passwordHash;
                user.dob = date.parse(req.body.dob) || "";
                user.genter = req.body.gender;

                // validate the User
                user.validate(function(err){
                    if(err){
                        res.json(err);
                        return;
                    } else {
                        // save User
                        user.save(function(err){
                            if(err)
                            {
                                res.json(err);
                                return;
                            }

                            // Remove passowrd before sending User details
                            user.password = undefined;
                            res.json(user);
                            return;
                        });
                    }
                });

            }
        });

    }
}

module.exports = UserController;


// userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');

const UserRoutes = function(app) {
    const router = express.Router();

    router.route('/users')
          .post(UserController.create);

    return router;
}

module.exports = UserRoutes;

// The above example may appear too big but if a beginner at node.js with a little blend of express knowledge tries to go through this will ﬁnd it easy and really helpful.