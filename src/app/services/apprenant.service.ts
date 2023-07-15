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

  searchApprenant(theKeyword: string): Observable<any[]> {
    // need build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search?term=${theKeyword}`;
    return this.httpClient.get<any[]>(searchUrl);

  }

  addApprenant(theApprenant: Object): Observable<Object> {

    return this.httpClient.post(this.baseUrl, theApprenant);

  }

  updateApprenant(id: number, theApprenant: any): Observable<any> {

    console.log(theApprenant);
    return this.httpClient.put(`${this.baseUrl}/${id}`, theApprenant);

  }


  getApprenantById(apprenantId: number): Observable<Apprenant> {
    const url = `${this.baseUrl}/apprenants/${apprenantId}`;
    return this.httpClient.get<Apprenant>(url);
  }

  getApprenantDetails(theAdminId: number, theApprenantId: number): Observable<Apprenant> {
    const apprenantUrl = `${this.baseUrl}/details?adminId=${theAdminId}&id=${theApprenantId}`;
    return this.httpClient.get<Apprenant>(apprenantUrl);
  }

}

// interface GetResponse {
//   _embedded: {
//     apprenants: Apprenant[];
//  }
// }
