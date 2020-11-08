const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ideasRouter = require('./routes/ideas');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(bodyParser.json());

// WEBSOCKETS STUFF
const http = require('http');
const ws = require('ws');

const theHttpServer = http.createServer(app);
const theWebSocketServer = new ws.Server({
    server: theHttpServer,
});
// WEBSOCKETS END

app.use(cors({origin: true, credentials: true}));
app.options("*", cors({origin: true, credentials: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ideas', ideasRouter);
app.use('/comments', commentsRouter);

// websockets
let websockets = require('./websockets');
websockets.listen(theHttpServer, mongoose, theWebSocketServer);
websockets.onConnection();

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

app.use(function (err, req, res, next) {
    res.status(err.statusCode).json({error: err.message});
});

module.exports = app;
