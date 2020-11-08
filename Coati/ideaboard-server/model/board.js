'use strict';

const mongoose = require('mongoose');
const Idea = require('./idea.js');

const boardSchema = new mongoose.Schema({
    boardName: String,
    ideas: [Idea],
    QRcode: String,
});


boardSchema.methods.addNewIdeaToBoard = async function (idea) {

    this.ideas.push(idea);
    this.save();

};

boardSchema.methods.addUpVoteToIdea = async function (IdeaId) {

    /* This mapping method finds the index of the element in the list of ideas
     * where the id of the element is equal to the id of the element the user wants
     * to up vote.
     */
    const identifierToFind = this.ideas.map(function (element) {
        return element._id.toString();
    }).indexOf(IdeaId);

    if (identifierToFind !== -1) {
        this.ideas[identifierToFind].numberOfUpVotes++;
        this.save();
        return true;
    } else {
        return false;
    }
};

boardSchema.methods.addFingerprintToUpVotedPeople = async function (fingerprint, IDofIdea) {

        if((fingerprint !== null)&& (fingerprint !== undefined)) {
            const idFoundInListOfIdeas = this.ideas.map((element) => {
                return element._id.toString();
            }).indexOf(IDofIdea);

            if (idFoundInListOfIdeas !== -1) {
                this.ideas[idFoundInListOfIdeas].upvotedPeople.push(fingerprint);
                this.save();
            } else {
                throw new Error("Het idee bestaat niet.");
            }
        }
        else{
            throw new Error("De fingerprint bestaat niet")
        }
};

const Board = mongoose.model('Board', boardSchema);

module.exports = boardSchema;
