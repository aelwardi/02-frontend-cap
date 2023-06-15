import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperAdmin } from '../common/super-admin';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private baseUrl = 'http://localhost:8080/super_admin';
  constructor(private httpClient: HttpClient,
    //private tokenStorage: TokenStorageService
    ) { }


    getSuperAdmin(theSuperAdminId: number): Observable<SuperAdmin> {
      // need to build URL based on product id
      const superAdminUrl = `${this.baseUrl}/${theSuperAdminId}`;
      return this.httpClient.get<SuperAdmin>(superAdminUrl);
    }

    updateSuperAdmin(id: number, theSuperAdmin: any): Observable<any> {
      return this.httpClient.put(`${this.baseUrl}/${id}`, theSuperAdmin);
    }
}