import { Component, OnInit } from '@angular/core';
import { UsernameService } from 'src/app/services/username.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public usernameService: UsernameService) { }

  ngOnInit(): void {
  }

}
