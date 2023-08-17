import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Manager } from '../common/manager';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseUrl = 'http://localhost:8080/managers';
  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getManagerList(): Observable<Manager[]> {
    return this.httpClient.get<Manager[]>(this.baseUrl);
  }

  addManager(adminId: number, theAdmin: Object): Observable<Object> {
    const addURL = `${this.baseUrl}?adminId=${adminId}`;
    return this.httpClient.post(addURL, theAdmin);
  }
  
  searchManager(adminId: number, theKeyword: string): Observable<Manager[]> {
    const searchUrl = `${this.baseUrl}/search?adminId=${adminId}&term=${theKeyword}`;
    return this.httpClient.get<Manager[]>(searchUrl);
  }

  getManager(theManagerId: number): Observable<Manager> {
    // need to build URL based on product id
    const managerUrl = `${this.baseUrl}/${theManagerId}`;
    return this.httpClient.get<Manager>(managerUrl);
  }

  updateManager(adminId: number, id: number, theManager: any): Observable<any> {
    const updateMANAGER = `${this.baseUrl}/${id}?adminId=${adminId}`;
    return this.httpClient.put(updateMANAGER, theManager);
  }

  getManagerDetails(theAdminId: number ,theManagerId: number): Observable<Manager> {
    // need to build URL based on product id
    const managerUrl = `${this.baseUrl}/details?adminId=${theAdminId}&id=${theManagerId}`;
    return this.httpClient.get<Manager>(managerUrl);
  }
}
