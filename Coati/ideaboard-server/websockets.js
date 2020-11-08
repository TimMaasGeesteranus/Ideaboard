module.exports = {

    theWebSocketServer: null,

    listen: function (theHttpServer, mongoose, theWebSocketServer) {
        this.theWebSocketServer = theWebSocketServer;

        theHttpServer.listen(9000 || process.env.PORT, async () => {
            await mongoose.connect(`mongodb://localhost:27017/ideaboardDb`, {useNewUrlParser: true}, () => {
                console.log(`Schiphol idea board back-end by HAN project group Coati` +
                    ` has been started on port: ${theHttpServer.address().port}`);
            });
        });
    },

    onConnection: function () {

        let theWebSocketServer = this.theWebSocketServer;
        theWebSocketServer.on('connection', function connection(socket, req) {

            socket.on('message', function incoming(message) {

                message = JSON.parse(message);

                switch (message.message) {
                    case 'upvote':
                        theWebSocketServer.clients.forEach((client) => {
                            client.send(JSON.stringify({
                                type: message.message
                            }));
                        });
                        break;
                    case 'newIdea':
                        theWebSocketServer.clients.forEach((client) => {
                            client.send(JSON.stringify({
                                type: message.message
                            }));
                        });
                        break;
                    case 'newComment':
                        theWebSocketServer.clients.forEach((client) => {
                            client.send(JSON.stringify({
                                type: message.message
                            }));
                        });
                        break
                }
            });
        });
    },

    sendMessage: function(message) {
        let theWebSocketServer = this.theWebSocketServer;

        theWebSocketServer.clients.forEach((client) => {
            client.send(JSON.stringify({
                type: message
            }))
        })
    }
};
