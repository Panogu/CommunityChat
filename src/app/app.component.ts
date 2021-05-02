import { Component, OnInit } from '@angular/core';
import { ChatService } from './shared/services/chat.service';
import { UserService } from './shared/services/user.service';
import { WebsocketService } from './shared/services/websocket.service';
import { Subject } from 'rxjs';
import { DistributorService } from './shared/services/distributor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CommunityChat';


  constructor(private distributorService: DistributorService) {
  }

  ngOnInit(){
    this.distributorService.subscribeToWebsocket();    
  }
}
