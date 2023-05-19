import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../common/admin';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl ='http://localhost:8080/api/admins';
  constructor(private httpClient: HttpClient) { }

  getAdminList(): Observable<Admin[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.admins)
    )
  }
}

interface GetResponse {
  _embedded: {
    admins: Admin[];
  }
}
