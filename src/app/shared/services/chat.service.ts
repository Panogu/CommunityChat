import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from '../model/message';
import { WebsocketService } from './websocket.service';
import * as Rx from "rxjs/Rx";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Message[] = [];

  subs: any[] = [];

  constructor (private websocketService: WebsocketService, private userservice: UserService){
    //this.subscribeToWebsocket();
  }

  /*public subscribeToWebsocket(){
    // What to do with websocket answers
    this.websocketService.socket.subscribe(wsc => {
      let data = JSON.parse(wsc.data)
      console.log(wsc.data);
      if (data.type == 'message'){
        console.log("Response from websocket: " + data.type);
        this.messages.push(JSON.parse(data.content));
      }
      if (data.type == 'message_history'){
        console.log("Response from websocket: " + data.type);
        this.messages = JSON.parse(data.content);
      }
    });

    console.log("Subscribed chatService!")
  }*/

  displayMessage(){
    window.setTimeout(() => this.subs.forEach(fn => fn()), 1);
  }

  addMessage(message_text: string) {    
    // Create a new message
    let message: Message = {
      id: 0,
      timestamp: Date.now(),
      user: this.userservice.person,
      content: message_text
    }
    
    // Send the message over the websocket
    this.websocketService.sendToWebsocket('message', JSON.stringify(message));
  }

  subscribe(sub: any){
    this.subs.push(sub);
  }
  
}
