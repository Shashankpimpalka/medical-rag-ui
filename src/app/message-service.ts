import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages = signal<{ role: string; text: string }[]>([]);

  addMessage(role: string, text: string){
     this.messages.update((prev) => [...prev, { role, text }]);
  }
  clearMessage(){
     this.messages.set([]);
    this.messages.set([
  { role: 'ai', text: 'Hello! How can I help you today?' }
]);
  }
}
