import { Component, OnInit } from '@angular/core';
import { Message } from '../../message';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(public chatService: ChatService) { 
    chatService.subscribe(() => {
      const messageBody = document.querySelector('#chatverlauf-container');
      if (messageBody)
        messageBody.scrollTop = messageBody.scrollHeight;
    });
  }

  ngOnInit(): void {
  }

  public getTimeFromTimestamp (timestamp: number): string {
    return new Date(timestamp).toISOString().slice(-13, -8);;
  }

}
