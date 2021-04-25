import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../../message';
import { ChatService } from '../../services/chat.service';
import { UsernameService } from 'src/app/services/username.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  public message_text = "";
  public error_message = "";

  constructor(private chatService: ChatService, public usernameService: UsernameService) {
  }

  ngOnInit(): void {
  }

  public addMessage(message_text: string): void {

    if ( !message_text?.trim() ) {
      this.error_message = 'Bitte Text eingeben!';
      
      alert( this.error_message );
      console.log( this.error_message );

      return;
    }

    //alert( message );
    console.log( message_text );

    let message: Message = {
      id: 0,
      username: "",
      timestamp: 0,
      content: message_text
    };

    this.chatService.add( message, this.usernameService.currentUsername );

    this.message_text = "";
    this.error_message = "";
  }

}
