/**
 * @jest-environment node
 */

'use strict';

const baseURL = "http://localhost:9000/users";

const fetch = require('node-fetch');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = require('../model/user');
const User = mongoose.model('User', userSchema);

describe('Registration tests', () => {

    let exampleUserData = {
        username: 'testingPurposeUsername',
        email: 'test@test.test',
        firstName: 'testingPurposeFirstName',
        lastName: 'testingPurposeLastName',
        password: 'testingPurposePassword'
    };

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/ideaboardDb', {useNewUrlParser: true});
    });

    afterEach(async () => {
        exampleUserData = {
            username: 'testingPurposeUsername',
            email: 'test@test.test',
            firstName: 'testingPurposeFirstName',
            lastName: 'testingPurposeLastName',
            password: 'testingPurposePassword'
        };
        await User.deleteOne({username: exampleUserData.username});
    });

    test('Register a new account with valid data', async () => {

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exampleUserData)
        };

        const response = await fetch(`${baseURL}/register`, requestHeaders);
        const result = await response.json();
        const expectedStatusCode = 200;

        const resultUser = {
            username: result.username,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName
        };

        const modifiedExampleUser = {
            username: exampleUserData.username,
            email: exampleUserData.email,
            firstName: exampleUserData.firstName,
            lastName: exampleUserData.lastName
        };

        expect(resultUser).toEqual(modifiedExampleUser);
        expect(response.status).toEqual(expectedStatusCode);
    });

    test('Register an account with valid data while the account already exists by registering it twice', async () => {

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exampleUserData)
        };

        const attemptsToRegister = 2;

        let result;
        let response;

        for (let index = 0; index < attemptsToRegister; index++) {
            response = await fetch(`${baseURL}/register`, requestHeaders);
            result = await response.json();
        }

        const errorMessage = "Deze gebruiker is al geregistreerd.";
        const expectedStatusCode = 400;

        expect(result.error).toEqual(errorMessage);
        expect(response.status).toEqual(expectedStatusCode);

    });

    test('Try to register an account with an invalid e-mail', async () => {

        exampleUserData.email = "aaaa";

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exampleUserData)
        };

        const response = await fetch(`${baseURL}/register`, requestHeaders);
        const result = await response.json();
        const expectedStatusCode = 400;
        const expectedErrorMessage = 'Voer een geldig e-mailadres in.';

        expect(response.status).toEqual(expectedStatusCode);
        expect(result.error).toEqual(expectedErrorMessage);
    });

    test('Try to register an account with an invalid username', async () => {

        exampleUserData.username = "aaaa";

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exampleUserData)
        };

        const response = await fetch(`${baseURL}/register`, requestHeaders);
        const result = await response.json();
        const expectedStatusCode = 400;
        const expectedErrorMessage = 'Voer een gebruikersnaam in die uit minimaal zes tekens bestaat.';

        expect(response.status).toEqual(expectedStatusCode);
        expect(result.error).toEqual(expectedErrorMessage);
    });

    test('Try to register an account with an invalid password', async () => {

        exampleUserData.password = "aaaa";

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exampleUserData)
        };

        const response = await fetch(`${baseURL}/register`, requestHeaders);
        const result = await response.json();
        const expectedStatusCode = 400;
        const expectedErrorMessage = 'Voer een wachtwoord in die uit minimaal zes tekens bestaat.';

        expect(response.status).toEqual(expectedStatusCode);
        expect(result.error).toEqual(expectedErrorMessage);
    });

});

describe('Login tests', () => {

    const keyForVerification = "someExtremelySuperDuperFancyTokenKey";

    const testUserData = {
        username: 'testingPurposeUsername',
        email: 'test@test.test',
        firstName: 'testingPurposeFirstName',
        lastName: 'testingPurposeLastName',
        password: 'testingPurposePassword'
    };

    beforeAll(async () => {

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testUserData)
        };

        const returnedUser = await fetch(`${baseURL}/register`, requestHeaders);

        const returnedUserToObject = await returnedUser.json();

        testUserData.id = returnedUserToObject._id;
    });

    beforeEach(async () => {

    });

    afterEach(async () => {

    });

    afterAll(async () => {
        await User.deleteOne({username: testUserData.username});
    });

    test('log in with correct credentials and without remember me', async () => {

        const credentialsForRequest = {
            username: testUserData.username,
            password: testUserData.password
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        let result = {
            id: "thisIsNotAValidId"
        };

        jwt.verify(resultFromResponse.token, keyForVerification, {ignoreExpiration: true}, function (err, payload) {

            result.id = payload.userId;

        });

        expect(result.id).toEqual(testUserData.id);

    });

    test('Log in with correct credentials and remember me', async () => {

        const credentialsForRequest = {
            username: testUserData.username,
            password: testUserData.password,
            rememberMe: true
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        let result = {
            id: "thisIsNotAValidId"
        };

        let deviceIdentifier = "not a device identifier";

        jwt.verify(resultFromResponse.token, keyForVerification, {ignoreExpiration: true}, function (err, payload) {

            result.id = payload.userId;
            deviceIdentifier = payload.deviceIdentifier

        });

        User.findById(testUserData.id, async function (err, userFromDB) {
            const resultFromDoesDeviceExist = await userFromDB.doesDeviceExist(deviceIdentifier);
            expect(resultFromDoesDeviceExist).toEqual(true);
        });

    });

    test('log in with incorrect password', async () => {

        const credentialsForRequest = {
            username: testUserData.username,
            password: "This is a non existing password"
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        const expectedErrorMessage = "onjuiste gebruikersnaam en/of wachtwoord";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);

    });

    test('log in with incorrect password and remember me toggled on', async () => {

        const credentialsForRequest = {
            username: testUserData.username,
            password: "This is a non existing password",
            rememberMe: true
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        const expectedErrorMessage = "onjuiste gebruikersnaam en/of wachtwoord";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);

    });

    test('log in with incorrect username', async () => {

        const credentialsForRequest = {
            username: "This is a non existing username",
            password: testUserData.password
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        const expectedErrorMessage = "onjuiste gebruikersnaam en/of wachtwoord";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);

    });

    test('log in with incorrect username and remember me toggled on', async () => {

        const credentialsForRequest = {
            username: "This is a non existing username",
            password: testUserData.password,
            rememberMe: true
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        const expectedErrorMessage = "onjuiste gebruikersnaam en/of wachtwoord";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);

    });

    test('log in with incorrect username and password', async () => {

        const credentialsForRequest = {
            username: "This is a non existing username",
            password: "This is a non existing password"
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        const expectedErrorMessage = "onjuiste gebruikersnaam en/of wachtwoord";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);

    });

    test('log in with incorrect username and password and remember me toggled on', async () => {

        const credentialsForRequest = {
            username: "This is a non existing username",
            password: "This is a non existing password",
            rememberMe: true
        };

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsForRequest)
        };

        const response = await fetch(`${baseURL}/signin`, requestHeaders);
        const resultFromResponse = await response.json();

        const expectedErrorMessage = "onjuiste gebruikersnaam en/of wachtwoord";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);

    });

});

describe('Get user by id tests', () => {

    const testUserData = {
        username: 'testingPurposeUsername',
        email: 'test@test.test',
        firstName: 'testingPurposeFirstName',
        lastName: 'testingPurposeLastName',
        password: 'testingPurposePassword'
    };

    beforeAll(async () => {

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testUserData)
        };

        const returnedUser = await fetch(`${baseURL}/register`, requestHeaders);

        const returnedUserToObject = await returnedUser.json();

        testUserData.id = returnedUserToObject._id;
    });

    beforeEach(async () => {

    });

    afterEach(async () => {

    });

    afterAll(async () => {
        await User.deleteOne({username: testUserData.username});
        await mongoose.disconnect();
    });

    test('Test that a user comes back when the correct userId is given', async () => {

        const response = await fetch(`${baseURL}/user/${testUserData.id}`);
        const returnedUser = await response.json();

        expect(testUserData.id).toEqual(returnedUser._id);
        expect(testUserData.username).toEqual(returnedUser.username);
        expect(testUserData.email).toEqual(returnedUser.email);
        expect(testUserData.firstName).toEqual(returnedUser.firstName);
        expect(testUserData.lastName).toEqual(returnedUser.lastName);

    });

    test('Test that an error is given, when a non existing userId is used as path parameter', async () => {

        const fakeIdForTesting = "This-is-a-very-fake-id-that-won't do anything.";
        const response = await fetch(`${baseURL}/user/${fakeIdForTesting}`);
        const returnedError = await response.json();

        const expectedMessage = "Er is geen gebruiker met het opgegeven id gevonden.";

        expect(returnedError.error).toEqual(expectedMessage);

    });

});
