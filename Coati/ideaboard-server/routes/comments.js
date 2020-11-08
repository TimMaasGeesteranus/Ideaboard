const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const commentSchema = require('../model/comment');
const websockets = require('../websockets');

require('../model/comment');

const Comment = mongoose.model('Comment', commentSchema);

router.get('/comments/:id', (req, res) => {
    function searchOnID(comment) {
        return comment.ideaId.toString() === req.params.id;
    }
    let array = [];
    Comment.find({}   // boardName: "IdeaBoard Schiphol"}
    ).then(comments => {
        array.push(comments.filter(searchOnID));
        res.json(array);
    });
});

router.post('/new', (req, res) => {
    let comment = new Comment({
        ideaId: req.body.ideaId,
        userId: req.body.userId,
        text: req.body.text,
        date: new Date()
    });

    comment.save(function (err, Comment) {
        if (err) return res.json({error: err});
        const msg = "newComment";
        websockets.sendMessage(msg);

        res.json(Comment);
    });
});


router.get('/all', (req, res) => {
    Comment.find({}
    ).then(comments => {
        res.json(comments);
    });
});


module.exports = router;
