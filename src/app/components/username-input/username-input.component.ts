import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService } from 'src/app/shared/services/chat.service';


@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css']
})
export class UsernameInputComponent implements OnInit {

  public username = "";

  constructor(private chatService: ChatService, private usernameService: UserService) {  }

  ngOnInit(): void {
  }

  public setUsername(username: string): void {

    if ( !username?.trim() ) {
    
      alert( "Bitte Nutzernamen eingeben!" );

      return;
    }

    this.usernameService.setUsername(username);

    this.username = "";
  }

}
