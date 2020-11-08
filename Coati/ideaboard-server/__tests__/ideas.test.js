/**
 * @jest-environment node
 */

'use strict';

const baseURL = "http://localhost:9000/ideas";

const fetch = require('node-fetch');
const mongoose = require('mongoose');

const boardSchema = require('../model/board');
const Board = mongoose.model('Board', boardSchema);

describe('Get ideas of board tests', () => {

    const id1 = mongoose.Types.ObjectId();
    const id2 = mongoose.Types.ObjectId();
    const ida1 = mongoose.Types.ObjectId();
    const ida2 = mongoose.Types.ObjectId();
    const ida3 = mongoose.Types.ObjectId();
    const ida4 = mongoose.Types.ObjectId();
    const ida5 = mongoose.Types.ObjectId();
    const ida6 = mongoose.Types.ObjectId();
    const ida7 = mongoose.Types.ObjectId();
    const ida8 = mongoose.Types.ObjectId();

    const newBoard = {
        collectionName: "Board",
        boardId:'5d07595a9b45af0a595e63fa',
        boardName: "Testbord",
        ideas:
            [
                {
                    upvotedPeople: [],
                    _id: ida1,
                    userId: id1,
                    title: 'Een centrale plek voor alle ideeen',
                    text: 'Een plek waar alle ideeen getoond worden op een scherm ofzo. Waar mensen dan op kunnnen stemmen via hun telefoon',
                    date: new Date('2019-04-12T12:12:12'),
                    numberOfUpVotes: 23,
                },
                {
                    upvotedPeople: [],
                    _id: ida2,
                    userId: id1,
                    title: 'Een uber voor kerstbomen',
                    text: 'Bestaat zoiets al?',
                    date: new Date('2019-04-11T12:12:12'),
                    numberOfUpVotes: 1,
                },
                {
                    upvotedPeople: [],
                    _id: ida3,
                    userId: id2,
                    title: 'Betere koffie inkopen bij de koffieboeren zelf',
                    text: 'In ieder geval beter dan die bocht uit de automaat?',
                    date: new Date('2019-04-09T12:12:12'),
                    numberOfUpVotes: 8,
                },
                {
                    upvotedPeople: [],
                    _id: ida4,
                    userId: id2,
                    title: 'Werkende printers kopen',
                    text: 'Het is verdomme niet normaal dat die krengen niet werken!',
                    date: new Date('2019-04-15T12:12:12'),
                    numberOfUpVotes: 5,
                },
                {
                    upvotedPeople: [],
                    _id: ida5,
                    userId: id1,
                    title: 'Een centrale plek voor alle ideeen',
                    text: 'Een plek waar alle ideeen getoond worden op een scherm ofzo. Waar mensen dan op kunnnen stemmen via hun telefoon',
                    date: new Date('2019-04-12T13:13:13'),
                    numberOfUpVotes: 21,
                },
                {
                    upvotedPeople: [],
                    _id: ida6,
                    userId: id1,
                    title: 'Een uber voor kerstbomen',
                    text: 'Bestaat zoiets al?',
                    date: new Date('2019-04-11T13:13:13'),
                    numberOfUpVotes: 11,
                },
                {
                    upvotedPeople: [],
                    _id: ida7,
                    userId: id2,
                    title: 'Betere koffie inkopen bij de koffieboeren zelf',
                    text: 'In ieder geval beter dan die bocht uit de automaat?',
                    date: new Date('2019-04-09T13:13:13'),
                    numberOfUpVotes: 53,
                },
                {
                    upvotedPeople: [],
                    _id: ida8,
                    userId: id2,
                    title: 'Dit is een test',
                    text: 'Dinsdag immers, stond gepland als ‘non-diving-day’. We zouden carnaval vieren met onze ‘mas band’, te vergelijken met een carnavalsvereniging, wat we in feite waren. Samen met de Speyside Rangers (‘ecologisten’ met als beroep visser die ijveren voor bescherming van de wateren in en om Speyside voor het vrijwaren van ons duikplezier en hun vangst) was ons thema ‘Ridge to Reef’ ofte ‘Regenwoud tot Koraalrif‘. Algemene boodschap: het ecosysteem ‘Tobago’ is één geheel; bescherm het voor de toekomst van je kinderen en inkomsten uit toerisme! Bijna de helft van ons allen was verkleed als ‘marine creature’ (dwz vis, papegaaivis, rog, …) en zowat de andere helft was oerwoudbewoner (aap, kolibri, papegaai, vlinder,…). Ook waren er enkele mensen verkleed als ’Ranger’ die dan het ecosysteem zouden beschermen van de kwade invloeden. Ik tenslotte, was verkleed als Kwade Invloed, genaamd ’Evil Spearfisher’. Ik was verkleed als een duivel, met een speer en hoorns en ik had me voor de gelegenheid ingesmeerd met houtskool. Ook had ik me kaal laten scheren, op een sik en mohawk (beiden blond!) na. De foto’s zijn behoorlijk ’evil’, ik moest weinig moeite doen om eruit te zien als de slechterik. Vroeg in de ochtend verzamelde onze mas band voor vertrek bij ons huis. Er moesten nog enkele kostuums gemaakt worden (in Tobago zijn mensen extreem ongeorganiseerd. Ronduit vervelend, zelfs voor iemand die in Europa niet als een planwonder beschouwd wordt…) voor we konden vertrekken, waardoor iedereen enkele uren rond ons huis aan het ‘limen’ was in plaats van carnaval vieren. \n' +
                        'Na aankomst in Scarborough (hoofdstad Tobago), was het tijd voor een goede lunch, gemaakt met lokaal voedsel (bestaande uit vlees- of visgerecht, vol stukken vet en een erg smakelijke saus; en zgn. ‘ground provisions’ ofte een mengsel van aardappelen, gekookte groene bananen -werken goed! als afrodisiacum-, zoete aardappelen, ….). Daarna was het tijd voor de ‘parade’. Wij achter onze truck, in vol ornaat en in de juiste muziek (playlistje van een uurtje; ken alle muziek intussen van buiten; prachtig souvenir; mensen die het afstudeerhok met mij gaan delen zullen het snel leren kennen) en zonder alcohol in het bloed; hebben een feestje gebouwd om U tegen te zeggen. Drie keer langs het parcours stond er een podium opgesteld voor de ‘jury’ en voor elk van deze podia deden we een soort van ‘voorstelling’ van wie we waren en wat we te vertellen hadden. Achteraf bleek dat we 4de zijn ge-eindigd. Een mooi resultaat voor de eerste keer dat deze mas-band haar ding deed. \n' +
                        'Na de stoet zelf, was het tijd voor het diner; en aangezien het 5.30pm geweest was, mochten we aan de alcohol. Clandestien was er al een en ander genuttigd, maar nu mochten er ook openbaar, volgens CoralCay-regels, 4 pilseners genuttigd worden. Immers, de dag erna was een duikdag en het is gevaarlijk om te duiken met teveel alcohol of afgebroken alcohol in je bloed. Uitdroging is de belangrijkste oorzaak van duikongevallen met blijvend letsel. \n' +
                        'Na het diner zagen we de andere mas-bands langskomen. Er zijn grofweg twee soorten. Je band is ofwel een ‘dance-band‘, zoals ons; of je bent een ‘steelband’. in het laatste geval heb je een gigantische truck vol met ‘steelpans’ ofte goed afgestemde olievaten, geschikt voor het produceren van calypso-muziek. Een LANGgekoesterde droom ging in vervulling. Corneel Jr. ging calypso-drummen op een steelpan. Ongelooflijk cool welke geluiden, ritmes en vibes je uit zo’n apparaat gesleept krijgt. Heerlijck ende puur genieten. De man met wie ik aan de praat raakte zei dat, op basis van mijn spel, ik duidelijk thuishoorde in de ritmesectie en dat ik een goede jazzdrummer was. Hij bood me zowaar een plek aan in zijn band. Ik moest hem helaas vertellen dat ik Europeaan was, met grote interesse maar geen tijd/mogelijkheid om zijn band te vervoegen. Vereerd verliet ik de truck…!',
                    date: new Date('2019-04-15T23:59:42'),
                    numberOfUpVotes: 17,
                }
            ],
        QRcode: 'Dit is een QRcode'
    };

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/ideaboardDb', {useNewUrlParser: true});
        Board.create(newBoard, (err, payload) => {

        });

        newBoard.ideas.forEach(element => {
            element._id = element._id.toString();
            element.userId = element.userId.toString();
            element.date = element.date.toISOString();
        });
    });

    beforeEach(async () => {

    });

    afterEach(async () => {

    });

    afterAll(async () => {
        await Board.deleteOne({boardName: newBoard.boardName});
        await mongoose.disconnect();
    });

    test('Test that ideas are returned', async () => {

        const response = await fetch(`${baseURL}/${newBoard.boardName}`);
        const resultFromResponse = await response.json();
        const automatedBoardId = resultFromResponse.boardId;

        expect(resultFromResponse).toEqual({boardId: automatedBoardId ,ideas:newBoard.ideas});

    });

    test('Test that no ideas are returned when the board name is invalid', async () => {

        const response = await fetch(`${baseURL}/some-fake-boardName that is non existent`);
        const resultFromResponse = await response.json();

        expect(resultFromResponse.error).toEqual("Er zijn nog geen ideeën. Maak er eentje aan!");

    });

    test('Test that top five ideas are returned', async () => {

        const response = await fetch(`${baseURL}/top5/${newBoard.boardName}`);

        const resultFromResponse = await response.json();

        const listOfIdeas = newBoard.ideas.sort((a, b) => b.numberOfUpVotes - a.numberOfUpVotes).slice(0, 5);

        expect(resultFromResponse).toEqual(listOfIdeas);

    });

    test('Test that top five ideas are not returned when board name is invalid', async () => {

        const response = await fetch(`${baseURL}/top5/this-is-some-fake-boardName that you will never see happening`);

        const resultFromResponse = await response.json();

        const expectedErrorMessage = "Er zijn nog geen ideeën. Maak er eentje aan!";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);
    });

    test('Test that the five newest ideas are returned based on date', async () => {

        const response = await fetch(`${baseURL}/top5newest/${newBoard.boardName}`);

        const resultFromResponse = await response.json();

        const listOfIdeas = newBoard.ideas.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 5);

        expect(resultFromResponse).toEqual(listOfIdeas);

    });

    test('Test that the five newest ideas are not returned, when the board name is invalid', async () => {

        const response = await fetch(`${baseURL}/top5newest/this-is-some-fancy-boardName that is totally fake and nonsense`);

        const resultFromResponse = await response.json();

        const expectedErrorMessage = "Er zijn nog geen ideeën. Maak er eentje aan!";

        expect(resultFromResponse.error).toEqual(expectedErrorMessage);

    });

    test('Test that up voting an existing idea is possible', async () => {

        const ideaToUpVote = newBoard.ideas[0];

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: ideaToUpVote._id,
                boardName: newBoard.boardName
            })
        };

        const response = await fetch(`${baseURL}/upvote`, requestHeaders);

        const resultFromResponse = await response.json();

        Board.findOne({boardName: newBoard.boardName}, (err, payload) => {
            if (err) {
                console.error(err.message);
            } else {
                const arrayOfIdeasFromDatabase = payload.ideas;
                const ideaFromListOfIdeas = arrayOfIdeasFromDatabase.find((element) => {
                    let elementId = element._id.toString();
                    if (elementId === ideaToUpVote._id) {
                        return element;
                    }
                });
                expect(resultFromResponse.success).toEqual("success");
                expect(ideaFromListOfIdeas.numberOfUpVotes).toEqual(ideaToUpVote.numberOfUpVotes + 1);
                newBoard.ideas[0].numberOfUpVotes = newBoard.ideas[0].numberOfUpVotes + 1;
            }
        });

    });

    test('Test that up voting an non existing idea is not possible', async () => {

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: "Some very fancy fake id you would-never see",
                boardName: newBoard.boardName
            })
        };

        const response = await fetch(`${baseURL}/upvote`, requestHeaders);

        const resultFromResponse = await response.json();

        const expectedErrorMessageFromServer = "Het idee wat u omhoog wilde stemmen, is niet gevonden.";
        const expectedStatusCode = 400;

        expect(resultFromResponse.error).toEqual(expectedErrorMessageFromServer);

        expect(response.status).toEqual(expectedStatusCode);

    });

    test('Test that up voting an existing idea on a non existing board is not possible', async () => {

        const ideaToUpVote = newBoard.ideas[0];

        const requestHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: ideaToUpVote._id,
                boardName: "Some super fancy non existing fake board name"
            })
        };

        const response = await fetch(`${baseURL}/upvote`, requestHeaders);
        const expectedStatusCode = 400;
        const resultFromResponse = await response.json();

        Board.findOne({boardName: newBoard.boardName}, (err, payload) => {
            if (err) {
                console.error(err.message);
            } else {
                const arrayOfIdeasFromDatabase = payload.ideas;
                const ideaFromListOfIdeas = arrayOfIdeasFromDatabase.find((element) => {
                    let elementId = element._id.toString();
                    if (elementId === ideaToUpVote._id) {
                        return element;
                    }
                });
                expect(response.status).toEqual(expectedStatusCode);
                expect(resultFromResponse.error).toEqual("U kunt geen idee omhoog stemmen op een bord wat niet bestaat.");
                expect(ideaFromListOfIdeas.numberOfUpVotes).toEqual(ideaToUpVote.numberOfUpVotes);
            }
        });

    });

});
