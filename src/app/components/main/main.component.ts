import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/model/message';
import { ChatService } from '../../shared/services/chat.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(public chatService: ChatService, public usernameService: UserService) {  }

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

}
