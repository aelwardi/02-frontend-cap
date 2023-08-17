import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Apprenant } from '../common/apprenant';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprenantService {


  private baseUrl = 'http://localhost:8080/apprenants';
  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }
  getApprenantList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);

  }
  addApprenant(adminId: number, theApprenant: Object): Observable<Object> {
    const addURL = `${this.baseUrl}?adminId=${adminId}`;
    return this.httpClient.post(addURL, theApprenant);

  }

  searchApprenant(adminId: number, theKeyword: string): Observable<Apprenant[]> {
    const searchUrl = `${this.baseUrl}/search?adminId=${adminId}&term=${theKeyword}`;
    return this.httpClient.get<Apprenant[]>(searchUrl);
  }

  getApprenantById(apprenantId: number): Observable<Apprenant> {
    const url = `${this.baseUrl}/${apprenantId}`;
    return this.httpClient.get<Apprenant>(url);
  }


  updateApprenant(adminId: number, id: number, theApprenant: any): Observable<any> {
    const updateAPPRENANT = `${this.baseUrl}/${id}?adminId=${adminId}`;
    return this.httpClient.put(updateAPPRENANT, theApprenant);
  }


  getApprenantDetails(theAdminId: number, theApprenantId: number): Observable<Apprenant> {
    const apprenantUrl = `${this.baseUrl}/details?adminId=${theAdminId}&id=${theApprenantId}`;
    return this.httpClient.get<Apprenant>(apprenantUrl);
  }

}

