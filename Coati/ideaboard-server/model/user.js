'use strict';

const mongoose = require('mongoose');
const argon2 = require('argon2/argon2');

const tokenSchema = require("./token.js");

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rememberedDevices: [tokenSchema]
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        user.password = await argon2.hash(user.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            hashLength: 50
        });
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await argon2.verify(this.password, candidatePassword);
    } catch (err) {
        return false;
    }
};

userSchema.methods.addNewDevice = async function () {
    const newObjectId = mongoose.Types.ObjectId();
    this.rememberedDevices.push(newObjectId);
    return newObjectId;
};

userSchema.methods.doesDeviceExist = async function (deviceId) {
    const identifierToDelete = this.rememberedDevices.map(function (e) {
        return e.id;
    }).indexOf(deviceId);
    return identifierToDelete !== -1;
};

userSchema.methods.deleteDevice = async function (deviceId) {
    const identifierToDelete = this.rememberedDevices.map(function (element) {
        return element.id;
    }).indexOf(deviceId);
    //indexOf returns -1 when it can't find the element. So check if an element is found.
    this.rememberedDevices.splice(identifierToDelete, 1);
    return true;
};

userSchema.methods.saveChanges = async function () {
    try {
        this.save();
        return true;
    } catch (err) {
        return false;
    }
};

const User = mongoose.model("User", userSchema);

module.exports = userSchema;
