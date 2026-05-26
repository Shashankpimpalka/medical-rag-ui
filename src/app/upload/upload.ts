import { Component } from '@angular/core';
import { Api } from '../api';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chat } from '../chat/chat';
import { MessageService } from '../message-service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, Chat],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  selectedFile : File | null = null;

  constructor(private service : Api, private messageService : MessageService){}

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];

  }

  clearDatabaseContext(): void{
    if (confirm("Are you sure you want to permanently delete all context ?")){
      this.service.delete().subscribe({
        next: (response: String) =>{
          alert("Success: Context is deleted from ")
          window.location.reload();
          this.messageService.addMessage('ai','Hello! How can I help you today?');        
        },
        error: (err)=>{
           console.error('Delete operation failed:', err);
          alert("Error: Failed to delete context from ChromaDB");
        }
      });
    }
  }

  upload(){
    if (!this.selectedFile) {
       alert("Please select a file first!");
       return;
   }
   
   this.service.uploadFile(this.selectedFile).subscribe({
     next: () => {
       alert("File uploaded successfully");
       this.selectedFile = null;},
     error: () => alert("Upload failed")
   });
  }


}
