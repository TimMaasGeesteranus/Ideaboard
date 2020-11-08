const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: false
    }
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = tokenSchema;
