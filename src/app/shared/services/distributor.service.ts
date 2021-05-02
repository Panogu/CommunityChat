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
    });
  }
}
