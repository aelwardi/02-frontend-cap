import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../common/admin';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Manager } from '../common/manager';
import { Apprenant } from '../common/apprenant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/admins';
  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getAdmin(theAdminId: number): Observable<Admin> {
    // need to build URL based on product id
    const adminUrl = `${this.baseUrl}/${theAdminId}`;
    return this.httpClient.get<Admin>(adminUrl);
  }

  getManagerList(adminId: number): Observable<Manager[]> {
    const managerAdminUrl = `${this.baseUrl}/${adminId}/managers`
    return this.httpClient.get<Manager[]>(managerAdminUrl);
  }
  getApprenantList(adminId: number): Observable<Apprenant[]> {
    const apprenantAdminUrl = `${this.baseUrl}/${adminId}/apprenants`
    return this.httpClient.get<Apprenant[]>(apprenantAdminUrl);
  }

  getDepartementByAdmin(adminId: number) {
    const url = `${this.baseUrl}/${adminId}/departements`;
    return this.httpClient.get(url);
  }

  getAdminList(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(this.baseUrl);

  }


  searchAdmin(theKeyword: string): Observable<Admin[]> {
    // need build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search?term=${theKeyword}`;
    return this.httpClient.get<Admin[]>(searchUrl);

  }

  addAdmin(superAdminId: number, theAdmin: Object): Observable<Object> {
    const addURL = `${this.baseUrl}?superAdminId=${superAdminId}`;
    return this.httpClient.post(addURL, theAdmin);

  }

  updateAdmin(superAdminId: number, id: number, theAdmin: any): Observable<any> {
    const updateADMIN = `${this.baseUrl}/${id}?superAdminId=${superAdminId}`;
    return this.httpClient.put(updateADMIN, theAdmin);
  }

  updateProfile(id: number, theAdmin: any): Observable<any> {
    const updateADMIN = `${this.baseUrl}/profile/${id}`;
    return this.httpClient.put(updateADMIN, theAdmin);
  }


  getAdminDetails(theAdminId: number): Observable<any> {
    const adminUrl = `${this.baseUrl}/details?theId=${theAdminId}`;
    return this.httpClient.get<Admin>(adminUrl);
  }


}

interface GetResponse {
  _embedded: {
    admins: Admin[];
  }
}
