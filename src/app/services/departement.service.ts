import { Injectable } from '@angular/core';
import { Departement } from '../common/departement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Projet } from '../common/projet';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private baseUrl = 'http://localhost:8080/departements';
  constructor(private httpClient: HttpClient,
    //private tokenStorage: TokenStorageService
    ) { }

    getDepartementList(): Observable<Departement[]> {
      return this.httpClient.get<Departement[]>(this.baseUrl);
  
    }

    getProjetsByDepartement(depId: number): Observable<Projet[]> {
      const urlProjects = `${this.baseUrl}/${depId}/projets`;
      return this.httpClient.get<Projet[]>(urlProjects);
    }
/*
  getDepartementList(): Observable<Departement[]> {

    const token = this.tokenStorage.getTokenValue();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const options = { headers };
      //console.log(token);
      return this.httpClient.get<GetResponse>(this.baseUrl, options).pipe(
        map(response => response._embedded.departements)
      )
    }
    else {
      return EMPTY;
    }
  }*/

  searchDepartement(theKeyword: string): Observable<Departement[]> {
    // need build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search?name=${theKeyword}`;
    return this.httpClient.get<Departement[]>(searchUrl);
    /*
    const token = this.tokenStorage.getTokenValue();

    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const options = { headers };
      //console.log(token);
      return this.httpClient.get<GetResponse>(searchUrl, options).pipe(
        map(response => response._embedded.departements)
      )
    }
    else {
      return EMPTY;
    }*/
  }


  addDepartement(theDepartement: any): Observable<any> {
    return this.httpClient.post<GetResponse>(this.baseUrl, theDepartement);
    /*
    const token = this.tokenStorage.getTokenValue();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const options = { headers };
      //console.log(token);
      return this.httpClient.post<GetResponse>(this.baseUrl, theDepartement, options);
    }
    else {
      return EMPTY;
    }*/
  }

  updateDepartement(id: number, theDepartement: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, theDepartement);
    /*
    const token = this.tokenStorage.getTokenValue();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const options = { headers };
      //console.log(token);
      return this.httpClient.put(`${this.baseUrl}/${id}`, theDepartement, options);
    }
    else {
      return EMPTY;
    }*/
  }

  deleteDepartement(id: number): Observable<any> {
    // need build URL based on the id
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
    /*
    const token = this.tokenStorage.getTokenValue();

    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const options = { headers };
      //console.log(token);
      return this.httpClient.delete(deleteUrl, options);
    }
    else {
      return EMPTY;
    }*/
  }
}

interface GetResponse {
  _embedded: {
    departements: Departement[];
  }
}