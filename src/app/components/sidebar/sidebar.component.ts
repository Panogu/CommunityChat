import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() public display: boolean;
  @Output() sidebarToggled = new EventEmitter<string>();

  closeModal: string = "";

  constructor(public usernameService: UserService, public adminService: AdminService, private modalService: NgbModal){
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

  public openDeletionModal(content: TemplateRef<any>){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      if (res == "Delete click"){
        this.adminService.deleteMessage(-2);
      }
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      console.log(this.closeModal);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
