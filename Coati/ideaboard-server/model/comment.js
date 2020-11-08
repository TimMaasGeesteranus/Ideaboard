'use strict';

const mongoose =  require('mongoose');

const commentSchema = new mongoose.Schema({
    ideaId: {type: mongoose.Schema.Types.ObjectId, ref:'Idea'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    text: String,
    date: Date,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = commentSchema;
