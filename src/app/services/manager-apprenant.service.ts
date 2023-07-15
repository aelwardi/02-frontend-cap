import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { ManagerApprenant } from '../common/manager-apprenant';
import { Observable } from 'rxjs';
import { Apprenant } from '../common/apprenant';

@Injectable({
  providedIn: 'root'
})
export class ManagerApprenantService {

  private baseUrl = 'http://localhost:8080/manager_apprenant';
  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getAssignmentManagerApprenant(theManagerId: number): Observable<ManagerApprenant> {

    const managerApprenantUrl = `${this.baseUrl}/${theManagerId}/apprenants`;
    return this.httpClient.get<ManagerApprenant>(managerApprenantUrl);
  }

  getApprenantsCleans(theAdminId: number, theManagerId: number): Observable<Apprenant[]> {

    const apprenantUrl = `${this.baseUrl}s?adminId=${theAdminId}&managerId=${theManagerId}`;
    return this.httpClient.get<Apprenant[]>(apprenantUrl);
  }

  addNewAssignment(theManagerId: number, theApprenantId: number) {
    const assignmentUrl = `${this.baseUrl}?apprenantId=${theApprenantId}&managerId=${theManagerId}`;
    return this.httpClient.post(assignmentUrl, null);
  }

  deleteAssignments(theApprenantId: number, theManagerId:number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${theApprenantId}/${theManagerId}`;
    return this.httpClient.delete(deleteUrl);
  }

}
