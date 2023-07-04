import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
import { Projet } from '../common/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private baseUrl = 'http://localhost:8080/projets';
  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  addProject(theProject: Object): Observable<Object> {
    console.log(theProject);
    return this.httpClient.post(this.baseUrl, theProject);
  }

  updateProject(id: number, theProject: any): Observable<any> {
    console.log(theProject);
    return this.httpClient.put(`${this.baseUrl}/${id}`, theProject);
  }

  deleteProject(id: number): Observable<any> {
    // need build URL based on the id
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  searchProjects(searchTerm: string, departementid: number): Observable<Projet[]> {
    return this.httpClient.get<Projet[]>(`${this.baseUrl}/search?term=${searchTerm}&departementId=${departementid}`);
  }
}
