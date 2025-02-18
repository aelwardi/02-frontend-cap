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

  getProjetsByDepartement(managerId: number): Observable<Projet[]>{
    const projetURL = `${this.baseUrl}?managerId=${managerId}`
    return this.httpClient.get<Projet[]>(projetURL);
  }

  addProject(managerId: number, theProject: Object): Observable<Object> {
    const addProjet = `${this.baseUrl}?managerId=${managerId}`
    return this.httpClient.post(addProjet, theProject);
  }

  updateProject(id: number, theProject: any): Observable<any> {
    //console.log(theProject);
    return this.httpClient.put(`${this.baseUrl}/${id}`, theProject);
  }

  deleteProject(id: number): Observable<any> {
    // need build URL based on the id
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  searchProjects(searchTerm: string, managerId: number): Observable<Projet[]> {
    return this.httpClient.get<Projet[]>(`${this.baseUrl}/search?term=${searchTerm}&managerId=${managerId}`);
  }
  getProjetsAndCoursByManagerId(managerId: number): Observable<any> {
    const projetCoursURL = `${this.baseUrl}/${managerId}/cours`;
    return this.httpClient.get<any>(projetCoursURL);
  }
}
