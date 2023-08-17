import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
import { ManagerInfo } from '../common/manager-info';

@Injectable({
  providedIn: 'root'
})
export class ManagerCoursService {
  private baseUrl = 'http://localhost:8080/manager_cours';

  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getAssignmentManagerCours(theCoursId: number): Observable<ManagerInfo[]> {
    const managerCoursUrl = `${this.baseUrl}/${theCoursId}/managers`;
    return this.httpClient.get<ManagerInfo[]>(managerCoursUrl);
  }

  deleteAssignments(theManagerId: number, theCoursId:number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${theManagerId}/${theCoursId}`;
    return this.httpClient.delete(deleteUrl);
  }

  getNoAssignmentManagerCours(theCoursId: number): Observable<ManagerInfo[]> {
    const managerUrl = `${this.baseUrl}/${theCoursId}`;
    return this.httpClient.get<ManagerInfo[]>(managerUrl);
  }

  addNewAssignment(theManagerId: number, theCoursId: number) {
    const assignmentUrl = `${this.baseUrl}?managerId=${theManagerId}&coursId=${theCoursId}`;
    return this.httpClient.post(assignmentUrl, null);
  }
}
