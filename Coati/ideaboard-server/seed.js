const dbName = 'ideaboardDb';
const mongoose = require('mongoose');
const BoardSchema = require('./model/board.js');
const CommentSchema = require('./model/comment.js');
const UserSchema = require('./model/user.js');

let id1 = mongoose.Types.ObjectId();
let id2 = mongoose.Types.ObjectId();
let ida1 = mongoose.Types.ObjectId();
let ida2 = mongoose.Types.ObjectId();
let ida3 = mongoose.Types.ObjectId();
let ida4 = mongoose.Types.ObjectId();
let ida5 = mongoose.Types.ObjectId();
let ida6 = mongoose.Types.ObjectId();
let ida7 = mongoose.Types.ObjectId();
let ida8 = mongoose.Types.ObjectId();

let idbb1 = mongoose.Types.ObjectId();
let idbb2 = mongoose.Types.ObjectId();
let idbb3 = mongoose.Types.ObjectId();

const db = mongoose.connection;

const Board = mongoose.model('Board', BoardSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const User = mongoose.model('User', UserSchema);

const users = seedUsers();
const comments = seedComments();
const boards = seedBoard();

mongoose.connect(`mongodb://localhost:27017/${dbName}`, {useNewUrlParser: true}).then(() => {
    return seedIdeaBoard();
}).catch((err) => {
    console.error(err);
}).then(() => {
    console.log("The data has been created successfully!");
});

function seedIdeaBoard() {

    User.create(users, function (error, doc) {
        if (error) {
            console.error(`err1: ${error}`)
        }
    });
    Comment.create(comments, function (error, doc) {
        if (error) {
            console.error(`err2: ${error}`)
        }
    });
    Board.create(boards, function (error, doc) {
        if (error) {
            console.error(`err3: ${error}`)
        }
    });
}

function seedBoard() {
    return {
        collectionName: "Board",
        boardName: "IdeaBoard Schiphol",
        ideas: [
            {
                upvotedPeople: [],
                _id: ida1,
                userId: id1,
                title: 'Koffie moet goedkoper',
                text: 'De koffie is niet betaalbaar',
                date: new Date('2019-04-12'),
                numberOfUpVotes: 25,
            },
            {
                upvotedPeople: [],
                _id: ida2,
                userId: id1,
                title: 'Vakantie moet langer',
                text: 'Hoe kan de vakantie zo kort zijn?',
                date: new Date('2019-04-11'),
                numberOfUpVotes: 1,
            },
            {
                upvotedPeople: [],
                _id: ida3,
                userId: id2,
                title: 'Meer parkeerruimtes',
                text: 'Elke keer als ik op de parkeerplaats komt, moet ik wachten tot er iemand weg gaat...',
                date: new Date('2019-04-09'),
                numberOfUpVotes: 8,
            },
            {
                upvotedPeople: [],
                _id: ida4,
                userId: id2,
                title: 'Werkende printers kopen',
                text: 'Het is verdomme niet normaal dat die krengen niet werken!',
                date: new Date('2019-04-15'),
                numberOfUpVotes: 5,
            },
            {
                _id: ida5,
                userId: id1,
                title: 'Een centrale plek voor alle ideeen',
                text: 'Een plek waar alle ideeen getoond worden op een scherm ofzo. Waar mensen dan op kunnnen stemmen via hun telefoon',
                date: new Date('2019-04-12'),
                numberOfUpVotes: 21,
            },
            {
                upvotedPeople: [],
                _id: ida6,
                userId: id1,
                title: 'Een uber voor kerstbomen',
                text: 'Bestaat zoiets al?',
                date: new Date('2019-04-11'),
                numberOfUpVotes: 11,
            },
            {
                _id: ida7,
                userId: id2,
                title: 'Betere koffie inkopen bij de koffieboeren zelf',
                text: 'In ieder geval beter dan die bocht uit de automaat?',
                date: new Date('2019-04-09'),
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
                date: new Date('2019-04-15'),
                numberOfUpVotes: 17,
            }
        ],
        QRcode: 'Dit is een QRcode'
    }
}

function seedUsers() {
    return [
        {
            _id : id1,
            username : "coati",
            password : "$argon2id$v=19$m=65536,t=3,p=1$QPX9pTyVQ/V8R/K531vUgg$rpPYUYKmADNDwNUyKz1VI0Oq/yCCTeflNLgL90J91Pp96Nl/86mZUjWE7PEDSmvVLWI",
            email : "coati@gmail.com",
            firstName : "Projectgroep",
            lastName : "Projectgroep Coati",
            rememberedDevices: [],
            createdAt : new Date("2019-05-10T12:22:00.618Z"),
            updatedAt : new Date("2019-05-10T12:22:00.618Z"),
        },
        {
            _id : id2,
            username : "Tim123",
            password : "Timmie",
            email : "tim123@gmail.com",
            firstName : "Tim",
            lastName : "Maasgeesteranus",
            rememberedDevices: [],
            createdAt : new Date("2019-05-10T12:22:00.618Z"),
            updatedAt : new Date("2019-05-10T12:22:00.618Z"),
        }
    ]
}

function seedComments() {
    return [
        {
            collectionName: 'Comment',
            _id: idbb1,
            ideaId: ida1,
            userId: id1,
            text: 'Wat een fantastisch idee!',
            date: new Date(),
        },
        {
            collectionName: 'Comment',
            _id: idbb2,
            ideaId: ida2,
            userId: id1,
            text: 'Daar ben ik het mee eens!',
            date: new Date('2019-04-22'),
        },
        {
            collectionName: 'Comment',
            _id: idbb3,
            ideaId: ida2,
            userId: id1,
            text: 'Bagger!',
            date: new Date('2019-04-23')
        }

    ]
}
