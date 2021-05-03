interface Message {
  id: number;
  timestamp: number;
  user: Person;
  content: string;
}

interface Person{
  id: number;
  username: string;
  color: string;
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Generates a HSL color
function generateColor(colors: number, colorNum: number){
    if (colors < 1) colors = 1; // defaults to one color - avoid dividing by zero


    //console.log(colorNum);
    // Split the color wheel in three quarters (two bright, one dark)
    let color_position = colorNum/colors;
    
    if (color_position < 0.375){
      color_position = scale(colorNum, 0, colors*0.375, -59, 30);
      if (color_position < 0){
        color_position = 360+color_position;
      }
      return "hsl(" + Math.floor(color_position) + ",100%,50%)";
    
    } else if (color_position < 0.625){
      color_position = scale(colorNum, colors*0.375, colors*0.625, 210, 300);
      return "hsl(" + Math.floor(color_position) + ",100%,50%)";
    
    } else {
      color_position = scale(colorNum, colors*0.625, colors, 0, 359);
      return "hsl(" + Math.floor(color_position) + ",100%,25%)";
    }
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
var messageHistory: Message[] = [];

// Users
var persons: Person[] = [];

// list of currently connected clients (users)
var clients: any[] = [];

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str: string) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * HTTP server
 */
var server = http.createServer(function(request: any, response: any) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
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
wsServer.on('request', function(request: any) {

  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin); 
  
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;
  let username = "";

  //var userColor = false;  console.log((new Date()) + ' Connection accepted.');  // send back chat history
  if (messageHistory.length > 0) {
    connection.sendUTF(
        JSON.stringify({ type: 'history', data: messageHistory} ));
  } 
  
  // Websocket received some message
  connection.on('message', function(incoming: any) {

    // Check if text message
    if (incoming.type == "utf8"){
      
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
          let userColor = generateColor(75, Math.floor(Math.random()*75));
          let newPerson: Person = {
            id: persons.length,
            username: username,
            color: userColor
          }

          persons.push(newPerson);

          console.log((new Date()) + ' New user is known as: ' + newPerson.username + ' with ID: ' + newPerson.id + ' and color: ' + newPerson.color);      

          // Send the new person
          connection.sendUTF(
            JSON.stringify({ type: 'username_accepted', content: JSON.stringify(newPerson) })
          );
      } else if (incoming_parsed.type == "request_history"){
        // Send history
        connection.sendUTF(
          JSON.stringify({ type: 'message_history', content: JSON.stringify(messageHistory) })
        );
      } else if (incoming_parsed.type == "message"){
        let message: Message;
        message = JSON.parse(incoming_parsed.content);

        // log and broadcast the message
        console.log((new Date()) + ' Received Message from ' + username + ': ' + message.content);
        
        // we want to keep history of all sent messages
        let newMessage: Message = {
          id: messageHistory.length,
          timestamp: (new Date()).getTime(),
          user: message.user,
          content: htmlEntities(message.content)
        };
        messageHistory.push(newMessage);

        console.log("New Message: ");
        console.log(newMessage);

        messageHistory = messageHistory.slice(-100);        // broadcast message to all connected clients
        var json = JSON.stringify({ type:'message', content: JSON.stringify(newMessage) });
        
        for (var i=0; i < clients.length; i++) {
          clients[i].sendUTF(json);
        }
      }
    }
  });
  
  // user disconnected
  connection.on('close', function(connection: any) {
    if (username != "") {
      console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
      
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      //colors.push(userColor);
    }
  });
});