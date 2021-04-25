import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Message[] = [];

  private subs: [() => void] = [() => {}];

  add(message: Message, username: string) {
    // Assign the current timestamp
    message.timestamp = Date.now();
    message.username = username;
    this.messages.push(message);
    window.setTimeout(() => this.subs.forEach(fn => fn()), 1);
  }

  clear() {
    this.messages = [];
  }

  subscribe(fn: () => void){
    this.subs.push(fn);
  }

  constructor() {  }

  
}
