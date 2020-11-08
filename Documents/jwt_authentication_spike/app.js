const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require("cors");
const http = require('http');

const User = require('./models/user');
const key = require("./key");
const mongoose = require("mongoose");

const dbName = "authentication_spike_database";
const app = express();

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

app.use(cors({origin: true, credentials: true}));
app.options("*", cors({origin: true, credentials: true}));

app.use(bodyParser.json());

const httpServer = http.createServer(app);

async function verifyTheGivenTokenOrGiveANewOne(req, res, next) {
    const token = req.body.token;
    jwt.verify(token, key.tokenKey, {ignoreExpiration: true}, async function (err, payload) {
        // This situation occurs when the token is correct and everything is alright.
        if (payload && payload.exp > Math.floor(Date.now() / 1000)) {
            User.findById(payload.userId, function (err, data) {
                if (err) {
                    err.statusCode = INTERNAL_SERVER_ERROR;
                    next(err);
                } else if (data === null) {
                    err = new Error("De gebruiker waarvoor u een token heeft, bestaat niet.");
                    err.statusCode = BAD_REQUEST;
                    next(err);
                } else {
                    req.body.tokenIsCorrect = true;
                    next();
                }
            });
            // This situation occurs when the token is expired.
        } else if (payload.exp < Math.floor(Date.now() / 1000)) {
            User.findById(payload.userId, async function (err, userFromDB) {
                // The deviceIdentifier is only generated when the user has opted to remember his login.
                if (payload.deviceIdentifier !== undefined && userFromDB !== null &&
                    await userFromDB.doesDeviceExist(payload.deviceIdentifier)) {
                    await userFromDB.deleteDevice(payload.deviceIdentifier);
                    const newDeviceIdentifier = await userFromDB.addNewDevice();
                    await userFromDB.saveChanges();
                    jwt.sign({
                        userId: userFromDB.id,
                        deviceIdentifier: newDeviceIdentifier
                    }, key.tokenKey, {expiresIn: '1h'}, function (err, newToken) {
                        if (err) {
                            err.statusCode = INTERNAL_SERVER_ERROR;
                            next(err);
                        } else {
                            req.body.newToken = newToken;
                            next();
                        }
                    });
                } else if (payload.deviceIdentifier !== undefined && userFromDB !== null &&
                    await !userFromDB.doesDeviceExist(payload.deviceIdentifier)) {
                    err = new Error("Uw apparaat is niet bekend in de database. Log opnieuw in.");
                    err.statusCode = BAD_REQUEST;
                    next(err);
                    // If the user has not opted to remember his login, he will need to login again.
                } else if (payload.deviceIdentifier === undefined && userFromDB !== null) {
                    err = new Error("Uw token is verlopen. U dient opnieuw in te loggen.");
                    err.statusCode = BAD_REQUEST;
                    next(err);
                } else {
                    err = new Error("De gebruiker waarvoor u een token heeft, bestaat niet.");
                    err.statusCode = BAD_REQUEST;
                    next(err);
                }
            });
        } else {
            err.statusCode = BAD_REQUEST;
            next(err);
        }
    })
    ;
}

app.post('/register', async function (req, res) {

    const newUserName = req.body;

    await User.findOne({username: newUserName.username}, function (err, usernameIfExists) {
        if (err) {
            res.status(500).json({message: err.message}).send();
        } else if (usernameIfExists === null) {
            User.create({
                username: newUserName.username,
                password: newUserName.password,
                email: newUserName.email,
                firstName: newUserName.firstName,
                lastName: newUserName.lastName
            }, function (err, newUser) {
                if (err) {
                    res.status(500).send(JSON.stringify({message: err.message}));
                } else {
                    res.status(200).send(JSON.stringify(newUser));
                }
            });
        } else {
            res.status(400).send(JSON.stringify({message: "Deze gebruiker is al geregistreerd."}));
        }
    });
});

app.post('/api/auth/signin', async function (req, res) {
    try {
        const userFromDB = await User.findOne({username: req.body.username});

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
                        res.status(500).json({message: err.message});
                    } else {
                        res.status(200).json({token});
                    }
                });
            } else {
                jwt.sign({
                    userId: userFromDB.id
                }, key.tokenKey, {expiresIn: '1h'}, function (err, token) {
                    if (err) {
                        res.status(500).json({message: err.message});
                    } else {
                        res.status(200).json({token});
                    }
                });
            }
        } else {
            res.status(400).json({message: 'Invalid Password/Username'});
        }
    } catch (err) {
        res.status(400).json({message: 'Invalid Password/Username'});
    }
});

app.get('/someFancyRequest', verifyTheGivenTokenOrGiveANewOne, async function (req, res) {
    if (req.body.tokenIsCorrect === true) {
        res.status(200).json({message: "Some fancy request now gives you some fancy answer."});
    } else {
        res.status(200).json({
            message: "Some fancy request now gives you some fancy answer.",
            newToken: req.body.newToken
        });
    }
});

app.use(function (err, req, res, next) {
    res.status(err.statusCode).json({error: err.message});
});

httpServer.listen("3000" || process.env.PORT, () => {
    mongoose.connect(`mongodb://localhost:27017/${dbName}`, {useNewUrlParser: true}, () => {
        console.log(`test spike server started on: ${httpServer.address().port}`);
    });
});
