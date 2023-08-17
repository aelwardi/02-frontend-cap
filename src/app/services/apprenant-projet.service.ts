import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
import { ApprenantInfo } from '../common/apprenant-info';

@Injectable({
  providedIn: 'root'
})
export class ApprenantProjetService {

  private baseUrl = 'http://localhost:8080/apprenant_projet';
  
  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getAssignmentApprenantProjet(theProjetId: number): Observable<ApprenantInfo[]> {
    const apprenantProjetUrl = `${this.baseUrl}/${theProjetId}/apprenants`;
    return this.httpClient.get<ApprenantInfo[]>(apprenantProjetUrl);
  }

  getApprenantsByManagerAndNotInProject(managerId: number, projetId: number): Observable<ApprenantInfo[]> {
    const apprenantURL = `${this.baseUrl}/${managerId}/${projetId}`;
    return this.httpClient.get<ApprenantInfo[]>(apprenantURL);
  }

  addApprenantProjet(apprenantId: number, projetId: number) {
    const assignmentUrl = `${this.baseUrl}?apprenantId=${apprenantId}&projetId=${projetId}`;
    return this.httpClient.post(assignmentUrl, null);
  }

  deleteApprenantProjet(apprenantId: number, projetId: number) {
    const deleteUrl = `${this.baseUrl}/${apprenantId}/${projetId}`;
    return this.httpClient.delete(deleteUrl);
  }
}
