import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizDTO } from '../common/quiz-dto';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = 'http://localhost:8080/quiz'
  constructor(private httpClient: HttpClient) { }

  getQuizWithProspal(chapitreId: number): Observable<QuizDTO[]> {
    const quizDTOUrl = `${this.baseUrl}?chapitreId=${chapitreId}`; 
    return this.httpClient.get<QuizDTO[]>(quizDTOUrl);
  }

  addQuizwithProposition(quizData: any, chapitreId: number): Observable<any> {
    const quizURL = `${this.baseUrl}_proposal?chapitreId=${chapitreId}`;
    return this.httpClient.post(quizURL, quizData);
  }

  deleteQuizwithProposal(theId: number, chapitreId: number){
    const deleteURL = `${this.baseUrl}/${theId}/${chapitreId}`;
    return this.httpClient.delete(deleteURL);
  }

  updateQuiz(chapitreId: number, quizId: number, theQuiz: any){
    const updateURL = `${this.baseUrl}/${chapitreId}/${quizId}`;
    return this.httpClient.put(updateURL, theQuiz);
  }
}
