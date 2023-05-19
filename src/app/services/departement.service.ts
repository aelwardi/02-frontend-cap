import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Departement } from '../common/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private baseUrl = 'http://localhost:8080/api/departements';
  constructor(private httpClient: HttpClient) { }

  getDepartementList(): Observable<Departement[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.departements)
    )
  }
}

interface GetResponse {
  _embedded: {
    departements: Departement[];
  }
}
