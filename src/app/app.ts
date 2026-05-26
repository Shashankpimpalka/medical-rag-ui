import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chat } from './chat/chat';
import { Upload } from './upload/upload';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  Chat, Upload, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('medical-rag-ui');
}
