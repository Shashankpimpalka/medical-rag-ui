import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private BASE_URL = 'http://localhost:8080';

  constructor(private http :HttpClient){}

  uploadFile(file: File){
    const formData = new FormData();
    formData.append('file',file)

    return this.http.post(`${this.BASE_URL}/api/upload`,formData,{ 
    responseType: 'text' 
  });
  }

  askQuestion(query :string, sessionId:string): Observable<any>{

    return this.http.post(`${this.BASE_URL}/api/rag/ask`,
      {query: query,
        sessionId:sessionId
      },{responseType: 'text'}
    )
  }

  delete():Observable<String>{
    return this.http.delete(`${this.BASE_URL}/api/delete`,{responseType:'text'});
  }
}
