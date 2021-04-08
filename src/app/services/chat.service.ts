import { Injectable } from '@angular/core';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Message[] = [];

  add(message: Message) {
    // Assign the current timestamp
    message.timestamp = Date.now();
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }

  
}
