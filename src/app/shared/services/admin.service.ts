import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public loggedIn: boolean = false;
  public opened: boolean = false;

  public showAdminTheme = false;

  private currentPassword = "";

  constructor() { }

  public login(password: string){

  }

  public open(){
    this.opened = true;
    this.showAdminTheme = true;
  }

  public close(){
    this.opened = false;
    this.showAdminTheme = false;
  }
}
