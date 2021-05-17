import { Component, OnInit, TemplateRef } from '@angular/core';
import { Message } from '../../shared/model/message';
import { ChatService } from '../../shared/services/chat.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public messageToDelete = -1;
  closeModal: string = "";

  constructor(public chatService: ChatService, public usernameService: UserService, public adminService: AdminService, private modalService: NgbModal) {  }

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
    let datePrefix = "Heute, ";

    const diffTime = Math.abs(Date.now() - timestamp);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    if (diffDays >= 1 && diffDays < 2){
      datePrefix = "Gestern, "
    } else if (diffDays >= 2) {
      let options = {weekday: 'narrow', year: 'numeric', month: '2-digit', day: '2-digit'};
      datePrefix = new Date(timestamp).toLocaleDateString('de-CH', options).slice(0, 3);
    }
    let datestring = new Date(timestamp).toLocaleTimeString().slice(0, -3);
    return datePrefix + datestring;
  }


  // Display the three different types of main view
  public displayMe(name: string): boolean {
    if (name == "username-input" && this.usernameService.person.id == -1){
      return true;
    }
    if (name == "admin" && this.usernameService.person.id != -1 && this.adminService.opened == true){
      return true;
    }
    if (name == "chatverlauf" && this.usernameService.person.id != -1 && this.adminService.opened == false) {
      return true;
    }

    return false;
  }

  public openDeletionModal(content: TemplateRef<any>, message_id: number){
    this.messageToDelete = message_id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      if (res == "Delete click"){
        this.adminService.deleteMessage(this.messageToDelete);
        this.messageToDelete = -1;
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
