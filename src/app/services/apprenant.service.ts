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
  addApprenant(theApprenant: Object): Observable<Object> {

    return this.httpClient.post(this.baseUrl, theApprenant);

  }

  searchApprenant(adminId: number, theKeyword: string): Observable<Apprenant[]> {
    const searchUrl = `${this.baseUrl}/search?adminId=${adminId}&term=${theKeyword}`;
    return this.httpClient.get<Apprenant[]>(searchUrl);
  }

  getApprenantById(apprenantId: number): Observable<Apprenant> {
    const url = `${this.baseUrl}/${apprenantId}`;
    return this.httpClient.get<Apprenant>(url);
  }


  updateApprenant(id: number, theApprenant: any): Observable<any> {

    //console.log(theApprenant);
    return this.httpClient.put(`${this.baseUrl}/${id}`, theApprenant);

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
