import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public person: Person;
  public userColor = "#00000";

  constructor(private websocketService: WebsocketService) {
    // Init the empty person
    this.person = {
      id: -1,
      username: "",
      color: ""
    }
    //this.subscribeToWebsocket();
  }

  /*public subscribeToWebsocket(){
    // What to do with websocket answers
    this.websocketService.socket.subscribe(wsc => {
      let data = JSON.parse(wsc.data);
      if (data.type == 'username_accepted'){  
        // Create the person if the server accepts it
        this.person = JSON.parse(data.content);
      }
      if (data.type == 'username_rejected'){

      }
    });

    console.log("Subscribed userService!");
  }*/

  setUsername(username: string) {

    // Send username request to the server
    this.websocketService.sendToWebsocket('register_user', username);
  }

  getSlicedUsername(username: string, count: number){
    if (username.length > count){
      return username.slice(0, count)+'...';
    }
    return username;
  }
}
