'use strict';

const mongoose =  require('mongoose');

const ideaSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    text: String,
    date: Date,
    numberOfUpVotes: Number,
    upvotedPeople: [String]
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = ideaSchema;
