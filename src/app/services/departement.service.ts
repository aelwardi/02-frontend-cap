import { Injectable } from '@angular/core';
import { Departement } from '../common/departement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  searchDepartement(theKeyword: string): Observable<Departement[]> {
    // need build URL based on the keyword
    const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(reponse => reponse._embedded.departements)
    );
  }

  
  addDepartement(theDepartement: Object): Observable<Object> {
    console.log(theDepartement);
    return this.httpClient.post('http://localhost:8080/api/departements', theDepartement);
  }

  updateDepartement(id: number, theDepartement: any): Observable<any> {
    return this.httpClient.put(`http://localhost:8080/api/departements/${id}`, theDepartement);
  }

  deleteDepartement(id: number): Observable<any> {
    // need build URL based on the id
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }
}

interface GetResponse {
  _embedded: {
    departements: Departement[];
  }
}