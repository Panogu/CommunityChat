import { Component, OnInit } from '@angular/core';
import { AdminService } from './shared/services/admin.service';
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

  public displaySidebar: boolean;

  constructor(private distributorService: DistributorService) {
    this.displaySidebar = false;
  }

  ngOnInit(){
    this.distributorService.subscribeToWebsocket();    
  }

  public onToggleSidebar(toggle: string){
    this.displaySidebar = !this.displaySidebar;
  }
}
