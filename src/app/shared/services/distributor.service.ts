import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private websocketService: WebsocketService, private chatService: ChatService, private userService: UserService) {

  }

  public subscribeToWebsocket(){
    // What to do with websocket answers
    this.websocketService.socket.subscribe(wsc => {
      let data = JSON.parse(wsc.data);
      if (data.type == 'username_accepted'){  
        // Create the person if the server accepts it
        this.userService.person = JSON.parse(data.content);
        this.websocketService.sendToWebsocket('request_history', '');
        this.websocketService.sendToWebsocket('request_users', '');
      }
      if (data.type == 'username_rejected'){

      }
      if (data.type == 'message'){
        console.log("Response from websocket: " + data.type);
        this.chatService.messages.push(JSON.parse(data.content));
        this.chatService.displayMessage();
      }
      if (data.type == 'message_history'){
        console.log("Response from websocket: " + data.type);
        this.chatService.messages = JSON.parse(data.content);
        this.chatService.displayMessage();
      }
      // Add all users
      if (data.type == 'users_online'){
        console.log("Response from websocket: " + data.type);
        this.userService.online = JSON.parse(data.content);
      }
      // Add a new user when he/she logged in
      if (data.type == 'user_logged_in'){
        console.log("Response from websocket: " + data.type);
        this.userService.online.push(JSON.parse(data.content));
      }
      // Remove disconnected users
      if (data.type == 'user_logged_out'){
        console.log("Response from websocket: " + data.type);
        this.userService.online = JSON.parse(data.content);
      }
    });
  }
}
