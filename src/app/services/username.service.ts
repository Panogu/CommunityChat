import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  public currentUsername = "";
  public userColor = "#00000";

  constructor() { }

  // Based on: https://stackoverflow.com/questions/1484506/random-color-generator
  private generateColor(numOfSteps: number, step: number){
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 0; b = 1; break; // Modified for contrast
        case 2: r = 1; g = 0; b = f; break; // Modified for contrast
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
        default: r = 0; g = 1; b = 1; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
  }

  setUsername(username: string) {
    // Assign the current username
    this.currentUsername = username;

    this.userColor = this.generateColor(256, Math.floor(Math.random()*256));
  }
}
