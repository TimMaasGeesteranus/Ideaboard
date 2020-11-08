//Dependencies for finding the user and verifying/signing new JWTs
const jwt = require('jsonwebtoken');
const User = require('../model/user');

//HTTP code constants
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

export const verifyTheGivenTokenOrGiveANewOne = async (req, res, next) => {
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
    });
};
