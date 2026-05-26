import { Component, inject, signal } from '@angular/core';
import { Api } from '../api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  query : string ='';
  response : string = '';
  sessionId : string = '';

  private messageService = inject(MessageService);



  constructor(private api : Api){}
  messages = this.messageService.messages;

  
send() {

    const currentQuery = this.query?.trim();
    if (!currentQuery) return;

    this.messageService.messages.update((prev) => [...prev, { role: 'user', text: currentQuery }]);

    this.api.askQuestion(this.query, this.sessionId).subscribe({
      next: (res: any) => {
        this.response = res;
       this.messageService.messages.update((prev) => [...prev, { role: 'ai', text: res }]);
      },
      error: () => alert("Error getting response")
    });

    this.query = '';
}




}
