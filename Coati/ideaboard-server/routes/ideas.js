const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const boardSchema = require('../model/board');
const ideaSchema = require('../model/idea');

const Board = mongoose.model('Board', boardSchema);
const Idea = mongoose.model('Idea', ideaSchema);

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const websockets = require('../websockets');


router.get('/all', (req, res) => {
    Board.find({}   // boardName: "IdeaBoard Schiphol"}
    ).then(board => {
        res.send(board[0].ideas);
    });
});

router.post('/new', async (req, res, next) => {

    const idea = new Idea({
        userId: req.body.userId,
        title: req.body.title,
        text: req.body.text,
        date: new Date(),
        numberOfUpVotes: 0
    });

    // Board.update(
    //     {"boardName": req.body.boardId},
    //     {$addToSet: {"ideas": idea}}, function (err, doc) {
    //         if (err) {
    //         }
    //
    //         const msg = "newIdea";
    //         websockets.sendMessage(msg);
    //
    //         res.send({succes: "succes"})
    //     });


    try {
        const boardFromDB = await Board.findOne({boardName: req.body.boardName}).exec();

        if (boardFromDB === null) {
            const err = new Error("Het bord waarin u een idee wilt aanmaken, bestaat niet.");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else {
            await boardFromDB.addNewIdeaToBoard(idea);
            const msg = "newIdea";
            res.send({success: "success"});
            websockets.sendMessage(msg);
        }
    } catch (err) {
        err.statusCode = INTERNAL_SERVER_ERROR;
        next(err);
    }
});

router.get('/ideasPerUser/:id', (req, res) => {
    Board.find({}
    ).then(board => {
        let ideas = board[0].ideas;
        let userIdeas = [];
        ideas.forEach(function (idea) {
            if (idea.userId == req.params.id) {
                userIdeas.push(idea);
            }
        });
        res.send(userIdeas);
    });
});

router.post('/fingerprint', async (req, res, next) => {
    // Board.update({
    //     _id: req.body.boardId,
    //     "ideas._id": req.body.ideaId
    // }, {$push: {"ideas.$.upvotedPeople": {$each: [req.body.fingerprint]}}}, function (err, doc) {
    //     if (err) {
    //         return res.send(500, {error: err});
    //     }
    //     res.send({succes: "succes"})
    // });

    // Board.findById(req.body.boardId, async function(err, boardFromDB) {
    //     if (err) {
    //         err.statusCode = INTERNAL_SERVER_ERROR;
    //         next(err);
    //     } else if (boardFromDB === null) {
    //         const err = new Error("Het bord waarin u op een idee wilt stemmen, bestaat niet.");
    //         err.statusCode = BAD_REQUEST;
    //         next(err);
    //     } else {
    //         await boardFromDB.addFingerprintToUpVotedPeople(req.body.fingerprint, req.body.ideaId);
    //         res.send({success: "success"});
    //     }
    // });

    try {
        const boardFromDB = await Board.findById(req.body.boardId).exec();

        if (boardFromDB === null) {
            const err = new Error("Het bord waarin u op een idee wilt stemmen, bestaat niet.");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else {
            await boardFromDB.addFingerprintToUpVotedPeople(req.body.fingerprint, req.body.ideaId);
            res.send({success: "success"});
        }
    } catch (err) {
        err.statusCode = INTERNAL_SERVER_ERROR;
        next(err);
    }
});

router.get('/boardname', (req, res) => {
    Board.find({}   // boardName: "IdeaBoard Schiphol"}
    ).then(board => {
        res.json(board[0].boardName);
    });
});

router.get('/:boardName', (req, res, next) => {

    Board.findOne({boardName: req.params.boardName}, (err, payload) => {
        if (err) {
            err.statusCode = INTERNAL_SERVER_ERROR;
            next(err);
        } else if (payload == null) {
            err = new Error("Er zijn nog geen ideeën. Maak er eentje aan!");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else {
            res.status(200).json({ideas: payload.ideas, boardId: payload._id});
        }
    });
});

router.get('/top5/:boardName', async (req, res, next) => {

    Board.findOne({boardName: req.params.boardName}, (err, payload) => {
        if (err) {
            err.statusCode = INTERNAL_SERVER_ERROR;
            next(err);
        } else if (payload == null) {
            err = new Error("Er zijn nog geen ideeën. Maak er eentje aan!");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else {
            res.status(200).send(payload.ideas.sort((a, b) => b.numberOfUpVotes - a.numberOfUpVotes).slice(0, 5));
        }
    });

});

router.get('/top5Newest/:boardName', (req, res, next) => {

    Board.findOne({boardName: req.params.boardName}, (err, payload) => {
        if (err) {
            err.statusCode = INTERNAL_SERVER_ERROR;
            next(err);
        } else if (payload == null) {
            err = new Error("Er zijn nog geen ideeën. Maak er eentje aan!");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else {
            res.status(200).send(payload.ideas.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 5));
        }
    });
});

router.post('/upvote', (req, res, next) => {
    // Board.update(
    //     {
    //         boardName: req.body.boardName,
    //         "ideas._id": mongoose.Types.ObjectId(req.body._id)
    //     },
    //     {
    //         $inc: {"ideas.$.numberOfUpVotes": 1}
    //     },
    //     function (err, doc) {
    //         if (err) return res.send(500, {error: err});
    //         res.send({success: "success"})
    //     });

    Board.findOne({boardName: req.body.boardName}, async (err, boardFromDB) => {
        if (err) {
            err.statusCode = INTERNAL_SERVER_ERROR;
            next(err);
        } else if (boardFromDB === null) {
            err = new Error("U kunt geen idee omhoog stemmen op een bord wat niet bestaat.");
            err.statusCode = BAD_REQUEST;
            next(err);
        } else {
            const resultFromUpVoting = await boardFromDB.addUpVoteToIdea(req.body._id);
            if (resultFromUpVoting === true) {
                res.status(200).send({success: "success"});
                websockets.sendMessage("upvote");
            } else {
                err = new Error("Het idee wat u omhoog wilde stemmen, is niet gevonden.");
                err.statusCode = BAD_REQUEST;
                next(err);
            }
        }
    });
});

router.get('/idea/:id', (req, res) => {
    function searchOnID(ideas) {
        return ideas._id.toString() === req.params.id;
    }

    Board.find({'ideas._id': req.params.id}, (err, ideaBoard) => {
        if (err) return res.status(INTERNAL_SERVER_ERROR).send({error: err});
        let idea = ideaBoard[0].ideas.find(searchOnID);
        res.send({idea})
    })
});

module.exports = router;
