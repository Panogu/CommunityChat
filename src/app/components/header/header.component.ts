import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggled = new EventEmitter<string>();

  constructor(public usernameService: UserService, public adminService: AdminService) { }

  ngOnInit(): void {
  }

  public toggleSidebar(){
    console.log("toggled!");
    this.sidebarToggled.emit('toggle');
  }

}
