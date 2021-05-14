import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { WebsocketComm } from '../model/websocketcomm';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // URL to the server from which the messages are served
  private messagesUrl = "wss://ws.panogu.synology.me";

  socket: Subject<any>;

  constructor() {
    this.socket = this.createWebsocket();
  }

  public createWebsocket(): Subject<MessageEvent> {
    let socket = new WebSocket(this.messagesUrl);
    let observable = Observable.create(
                (observer: Observer<MessageEvent>) => {
                    socket.onmessage = observer.next.bind(observer);
                    socket.onerror = observer.error.bind(observer);
                    socket.onclose = observer.complete.bind(observer);
                    return socket.close.bind(socket);
                }
    );
    let observer = {
            next: (data: Object) => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(data));
                }
            }
    };
    return Subject.create(observer, observable);
  }

  public sendToWebsocket(type: string, content: string){
    let wsMessage: WebsocketComm = {
      type: type,
      content: content
    }

    this.socket.next(wsMessage);
  }
}
