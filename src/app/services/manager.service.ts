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

  addManager(theAdmin: Object): Observable<Object> {

    return this.httpClient.post(this.baseUrl, theAdmin);
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

  updateManager(id: number, theManager: any): Observable<any> {
    //console.log(theManager);
    return this.httpClient.put(`${this.baseUrl}/${id}`, theManager);
  }

  getManagerDetails(theAdminId: number ,theManagerId: number): Observable<Manager> {
    // need to build URL based on product id
    const managerUrl = `${this.baseUrl}/details?adminId=${theAdminId}&id=${theManagerId}`;
    return this.httpClient.get<Manager>(managerUrl);
  }
}
