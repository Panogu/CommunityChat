import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

interface AuthenticatedMessage {
  password: string;
  message_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public loggedIn: boolean = false;
  public opened: boolean = false;

  public showAdminTheme = false;

  private currentPassword = "";

  constructor(private websocketService: WebsocketService) { }

  public login(password: string){
    this.currentPassword = password;
    this.websocketService.sendToWebsocket('request_login', JSON.stringify(this.currentPassword));
  }

  public open(){
    this.opened = true;
    this.showAdminTheme = true;
  }

  public close(){
    this.opened = false;
    this.showAdminTheme = false;
  }

  public loginAccepted(){
    this.opened = false;
    this.loggedIn = true;
  }

  public deleteMessage(message_id: number){
    let message: AuthenticatedMessage = {
      password: this.currentPassword,
      message_id: message_id
    }

    this.websocketService.sendToWebsocket('delete_message', JSON.stringify(message));
  }
}
