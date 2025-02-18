import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  private baseUrl = 'http://localhost:8080/propositions'
  constructor(private httpClient: HttpClient) { }
  addProposition(quizId: number, proposal: any){
    const addURL = `${this.baseUrl}?quizId=${quizId}`;
    return this.httpClient.post(addURL, proposal);
  }
  updateProposition(theId: number, quizId: number, theProposition: any) {
    const updateURL = `${this.baseUrl}/${quizId}/${theId}`;
    return this.httpClient.put(updateURL, theProposition);
  }

  deleteProposition(theId: number, quizId: number){
    const deleteURL = `${this.baseUrl}/${theId}/${quizId}`;
    return this.httpClient.delete(deleteURL);
  }
}
