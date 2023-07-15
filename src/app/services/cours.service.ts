import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cours } from '../common/cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:8080/cours';

  constructor(private httpClient: HttpClient) { }

  getCoursesByProject(projectId: number): Observable<cours[]> {
    return this.httpClient.get<cours[]>(`${this.apiUrl}?projetId=${projectId}`);
  }

  addCours(projectId: any , coursData:any): Observable<Object> {
    console.log(projectId);
    return this.httpClient.post(`${this.apiUrl}?projetId=${projectId}`, coursData);
  }

  updateCours(id: number, theCours: any): Observable<any> {
    console.log(theCours);
    return this.httpClient.put(`${this.apiUrl}/${id}`, theCours);
  }

  deleteCours(id: number): Observable<any> {
    // need build URL based on the id
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  searchCours(term: string): Observable<cours[]> {
    return this.httpClient.get<cours[]>(`${this.apiUrl}/search?term=${term}`);
  }
}
