const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require("cors");
const http = require('http');

const key = require("../key");

const userSchema = require('../model/user');
const mongoose = require("mongoose");

const User = mongoose.model('User', userSchema);

let router = express.Router();

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

router.use(cors({origin: true, credentials: true}));
router.options("*", cors({origin: true, credentials: true}));

router.use(bodyParser.json());

/*const UserModel = mongoose.model('User');*/

router.get('/user/:id', (req, res, next) => {
    // User.find({'_id': req.params.id}, (err, data) => {
    //     let dataString = JSON.stringify(data[0]);
    //     let user = JSON.parse(dataString);
    //     if (err) return res.send(500, {error: err});
    //     res.json({
    //         _id: user._id,
    //         username: user.username,
    //         email: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName
    //     });
    // });

    User.findById(req.params.id, function (err, userFromDB) {

        if (userFromDB == null) {
            err = new Error("Er is geen gebruiker met het opgegeven id gevonden.");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else if (err) {
            err.statusCode = INTERNAL_SERVER_ERROR;
            next(err);
        } else {
            res.status(200).json({
                _id: userFromDB._id,
                username: userFromDB.username,
                email: userFromDB.email,
                firstName: userFromDB.firstName,
                lastName: userFromDB.lastName,
                createdAt: userFromDB.createdAt
            });
        }
    });
});

router.post('/register', async function (req, res, next) {
    const newUser = req.body;
    await User.findOne({username: newUser.username}, function (err, usernameIfExists) {
        if (err) {
            err.statusCode = BAD_REQUEST;
            next(err);
        } else if (usernameIfExists === null) {
            const minimalLength = 6;
            if (validationEmailFunction(newUser.email) && newUser.username.length >= minimalLength &&
                newUser.password.length >= minimalLength) {
                User.create({
                    username: newUser.username,
                    password: newUser.password,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }, function (err, newUser) {
                    if (err) {
                        err.statusCode = BAD_REQUEST;
                        next(err);
                    } else {
                        res.status(200).send(JSON.stringify(newUser));
                    }
                });
            } else {
                if (!validationEmailFunction(newUser.email)) {
                    err = new Error("Voer een geldig e-mailadres in.");
                    err.statusCode = BAD_REQUEST;
                    next(err);
                } else if (newUser.username.length < minimalLength) {
                    err = new Error("Voer een gebruikersnaam in die uit minimaal zes tekens bestaat.");
                    err.statusCode = BAD_REQUEST;
                    next(err);
                } else {
                    err = new Error("Voer een wachtwoord in die uit minimaal zes tekens bestaat.");
                    err.statusCode = BAD_REQUEST;
                    next(err);
                }
            }
        } else {
            const err = new Error("Deze gebruiker is al geregistreerd.");
            err.statusCode = BAD_REQUEST;
            next(err);
        }
    });
});

router.post('/signin', async function (req, res, next) {
    User.findOne({username: req.body.username}, async function (err, userFromDB) {
        if (userFromDB === null) {
            err = new Error("onjuiste gebruikersnaam en/of wachtwoord");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else {
            const answerFromComparing = await userFromDB.comparePassword(req.body.password);
            if (answerFromComparing) {
                if (req.body.rememberMe === true) {
                    const deviceIdentifier = await userFromDB.addNewDevice();
                    await userFromDB.saveChanges();
                    jwt.sign({
                        userId: userFromDB.id,
                        deviceIdentifier: deviceIdentifier
                    }, key.tokenKey, {expiresIn: '1h'}, function (err, token) {
                        if (err) {
                            err.statusCode = INTERNAL_SERVER_ERROR;
                            next(err);
                        } else {
                            res.status(200).json({id: userFromDB.id, token, username: req.body.username});
                        }
                    });
                } else {
                    jwt.sign({
                        userId: userFromDB.id
                    }, key.tokenKey, {expiresIn: '1h'}, function (err, token) {
                        if (err) {
                            err.statusCode = INTERNAL_SERVER_ERROR;
                            next(err);
                        } else {
                            res.status(200).json({id: userFromDB.id, token, username: req.body.username});
                        }
                    });
                }
            } else {
                const err = new Error("onjuiste gebruikersnaam en/of wachtwoord");
                err.statusCode = BAD_REQUEST;
                next(err);
            }
        }
    });
});

const validationEmailFunction = (inputEmail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(inputEmail).toLowerCase());
};

module.exports = router;
