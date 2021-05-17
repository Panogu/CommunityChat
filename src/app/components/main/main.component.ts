import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/model/message';
import { ChatService } from '../../shared/services/chat.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(public chatService: ChatService, public usernameService: UserService, public adminService: AdminService) {  }

  ngOnInit(): void {
    this.chatService.subscribe(() => {
      const messageBody = document.querySelector('#chatverlauf-container');
      if (messageBody)
        messageBody.scrollTop = messageBody.scrollHeight;
    });
  }

  public scrollToBottom() {
  }

  public getTimeFromTimestamp (timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString()/*.slice(0, -3)*/;
  }


  // Display the three different types of main view
  public displayMe(name: string): boolean {
    if (name == "username-input" && this.usernameService.person.id == -1){
      return true;
    }
    if (name == "admin" && this.usernameService.person.id != -1 && this.adminService.opened == true){
      return true;
    }
    if (name == "chatverlauf" && this.usernameService.person.id != -1 && this.adminService.opened == false) {
      return true;
    }

    return false;
  }

  public deleteMessage(){
    
  }

}
