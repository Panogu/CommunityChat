import { Component, OnInit } from '@angular/core';
import { UsernameService } from '../../services/username.service';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css']
})
export class UsernameInputComponent implements OnInit {

  public username = "";

  constructor(private usernameService: UsernameService) { }

  ngOnInit(): void {
  }

  public setUsername(username: string): void {
    if ( !username?.trim() ) {
    
      alert( "Bitte Nutzernamen eingeben!" );

      return;
    }

    this.usernameService.setUsername(username);
  }

}
