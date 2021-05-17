import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() public display: boolean;
  @Output() sidebarToggled = new EventEmitter<string>();

  constructor(public usernameService: UserService, public adminService: AdminService){
    this.display = false;
  }

  ngOnInit(): void {
  }

  public toggleSidebar(){
    this.sidebarToggled.emit('toggled');
  }

  public openLogin(){
    this.toggleSidebar();
    this.adminService.open()
  }

}
