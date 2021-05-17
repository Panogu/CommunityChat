import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../../shared/model/message';
import { ChatService } from '../../shared/services/chat.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  public message_text = "";
  public error_message = "";

  constructor(private chatService: ChatService, public usernameService: UserService, public adminService: AdminService) {
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

    this.chatService.addMessage(message_text);

    this.message_text = "";

  }

}
