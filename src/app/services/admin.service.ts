import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../common/admin';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/admins';
  constructor(private httpClient: HttpClient) { }

  getAdminList(): Observable<Admin[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.admins)
    )
  }

  searchAdmin(theKeyword: string): Observable<Admin[]> {
    // need build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/searchByNameOrLastName?term=${theKeyword}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(reponse => reponse._embedded.admins)
    );
  }

}

interface GetResponse {
  _embedded: {
    admins: Admin[];
  }
}
