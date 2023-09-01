import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChapitreDTO } from '../common/chapitre-dto';
import { QuizDTO } from '../common/quiz-dto';


@Injectable({
  providedIn: 'root'
})
export class SupportCoursService {


  private apiUrl = 'http://localhost:8080/supportcours';

  constructor(private httpClient: HttpClient) { }

  //check if chapitre have any support courses
  getChapitreWithSection(chapitreId: number): Observable<any[]> {
    const url = `${this.apiUrl}?chapitreId=${chapitreId}`;
    return this.httpClient.get<any[]>(url);
  }



  saveSupport(chapitreId: any, file: any, title: any): Observable<any> {
    //console.log("service log",chapitre , file , title)
    const formData = new FormData();
    formData.append('chapitreId', parseInt(chapitreId, 10).toString());
    formData.append('file', file, file.name);
    formData.append('title', title);

    return this.httpClient.post("http://localhost:8080/supportcours", formData);
  }

  // Delete support course by ID
  // deleteSupportCours(supportCoursId: number): Observable<void> {
  //   const url = `${this.apiUrl}/${supportCoursId}`;
  //   return this.httpClient.delete<void>(url);
  // }

  deleteSupportCoursById(supportCoursId: number): Observable<any> {
    const url = `${this.apiUrl}/${supportCoursId}`;

    return this.httpClient.delete(url);
  }
  getSupportCoursById(theId: number): Observable<any> {
    const supportURL = `${this.apiUrl}/${theId}`;

    return this.httpClient.get(supportURL);
  }



}
