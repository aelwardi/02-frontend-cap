import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
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

  addCours(managerId: number, projectId: number, theCours: any): Observable<Object> {
    //console.log(projectId);
    return this.httpClient.post(`${this.apiUrl}?managerId=${managerId}&projetId=${projectId}`, theCours);
  }

  getProjectById(idProject: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/projects/${idProject}`)
  }

  updateCours(id: number, projectId: number, theCours: cours): Observable<any> {
    //console.log("cours avec project ", theCours)
    return this.httpClient.put(`${this.apiUrl}/${id}/project/${projectId}`, theCours);
  }

  deleteCours(id: number): Observable<any> {
    // need build URL based on the id
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  searchCours(term: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/search?term=${term}`);
  }

  getCoursWithChapitre(id: number): Observable<any> {
    const coursDtoURL = `${this.apiUrl}DTO?coursId=${id}`;
    return this.httpClient.get(coursDtoURL);
  }
}
