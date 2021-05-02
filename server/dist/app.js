// Based on: https://stackoverflow.com/questions/1484506/random-color-generator
function generateColor(numOfSteps, step) {
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch (i % 6) {
        case 0:
            r = 1;
            g = f;
            b = 0;
            break;
        case 1:
            r = q;
            g = 0;
            b = 1;
            break; // Modified for contrast
        case 2:
            r = 1;
            g = 0;
            b = f;
            break; // Modified for contrast
        case 3:
            r = 0;
            g = q;
            b = 1;
            break;
        case 4:
            r = f;
            g = 0;
            b = 1;
            break;
        case 5:
            r = 1;
            g = 0;
            b = q;
            break;
        default:
            r = 0;
            g = 1;
            b = 1;
            break;
    }
    var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) + ("00" + (~~(g * 255)).toString(16)).slice(-2) + ("00" + (~~(b * 255)).toString(16)).slice(-2);
    return (c);
}
// THE ACTUAL APP
"use strict";
process.title = 'CommunityChat';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
/**
 * Global variables
 */
// latest 100 messages
var messageHistory = [];
// Users
var persons = [];
// list of currently connected clients (users)
var clients = [];
/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/**
 * HTTP server
 */
var server = http.createServer(function (request, response) {
    // Not important for us. We're writing WebSocket server,
    // not HTTP server
});
server.listen(webSocketsServerPort, function () {
    console.log((new Date()) + " Server is listening on port "
        + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to an HTTP server. WebSocket
    // request is just an enhanced HTTP request. For more info 
    // http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin '
        + request.origin + '.'); // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin);
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    let username = "";
    //var userColor = false;  console.log((new Date()) + ' Connection accepted.');  // send back chat history
    if (messageHistory.length > 0) {
        connection.sendUTF(JSON.stringify({ type: 'history', data: messageHistory }));
    }
    // Websocket received some message
    connection.on('message', function (incoming) {
        // Check if text message
        if (incoming.type == "utf8") {
            let incoming_parsed = JSON.parse(incoming.utf8Data);
            // first message sent by user is their name     
            if (incoming_parsed.type == 'register_user') {
                // remember user name
                username = htmlEntities(incoming_parsed.content);
                /*persons.forEach(person => {
                  if (person.username = username){
                    console.log((new Date()) + ' Username already exists ' + username);
                    connection.sendUTF(
                      JSON.stringify({ type: 'username_rejected', content: JSON.stringify(username) })
                    );
                    return;
                  }
                });*/
                // get random color and send it back to the user
                let userColor = generateColor(256, Math.floor(Math.random() * 256));
                let newPerson = {
                    id: persons.length,
                    username: username,
                    color: userColor
                };
                persons.push(newPerson);
                console.log((new Date()) + ' New user is known as: ' + newPerson.username + ' with ID: ' + newPerson.id);
                // Send the new person
                connection.sendUTF(JSON.stringify({ type: 'username_accepted', content: JSON.stringify(newPerson) }));
            }
            else if (incoming_parsed.type == "request_history") {
                // Send history
                connection.sendUTF(JSON.stringify({ type: 'message_history', content: JSON.stringify(messageHistory) }));
            }
            else if (incoming_parsed.type == "message") {
                let message;
                message = JSON.parse(incoming_parsed.content);
                // log and broadcast the message
                console.log((new Date()) + ' Received Message from ' + username + ': ' + message.content);
                // we want to keep history of all sent messages
                let newMessage = {
                    id: messageHistory.length,
                    timestamp: (new Date()).getTime(),
                    user: message.user,
                    content: htmlEntities(message.content)
                };
                messageHistory.push(newMessage);
                console.log("New Message: ");
                console.log(newMessage);
                messageHistory = messageHistory.slice(-100); // broadcast message to all connected clients
                var json = JSON.stringify({ type: 'message', content: JSON.stringify(newMessage) });
                for (var i = 0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });
    // user disconnected
    connection.on('close', function (connection) {
        if (username != "") {
            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
            // push back user's color to be reused by another user
            //colors.push(userColor);
        }
    });
});
//# sourceMappingURL=app.js.map