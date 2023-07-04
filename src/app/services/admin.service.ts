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

  /*
getAdminList(): Observable<Admin[]> {
  return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
    map(response => response._embedded.admins)
  )
  const token = this.tokenStorage.getTokenValue();
  if (token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const options = { headers };
    // console.log(options);
    return this.httpClient.get<GetResponse>(this.baseUrl, options).pipe(
      map(response => response._embedded.admins)
    )
  }
  else {
    return EMPTY;
  }
}*/

  searchAdmin(theKeyword: string): Observable<Admin[]> {
    // need build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search?term=${theKeyword}`;
    return this.httpClient.get<Admin[]>(searchUrl);
    /*
    const token = this.tokenStorage.getTokenValue();

    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const options = { headers };
      //console.log(token);
      return this.httpClient.get<GetResponse>(searchUrl, options).pipe(
        map(response => response._embedded.admins)
      )
    }
    else {
      return EMPTY;
    }*/
  }

  addAdmin(theAdmin: Object): Observable<Object> {

    return this.httpClient.post(this.baseUrl, theAdmin);
    /*
        const token = this.tokenStorage.getTokenValue();
        if (token) {
          const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
          const options = { headers };
          //console.log(token);
          return this.httpClient.post(this.baseUrl, theAdmin, options);
        }
        else {
          return EMPTY;
        }
        // console.log(theAdmin);
       // return this.httpClient.post<any>(`http://localhost:8085/api/admins`, admin);
       */
  }

  updateAdmin(id: number, theAdmin: any): Observable<any> {
    console.log(theAdmin);
    return this.httpClient.put(`${this.baseUrl}/${id}`, theAdmin);
    /*
    const token = this.tokenStorage.getTokenValue();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const options = { headers };
      //console.log(token);
      return this.httpClient.put(`${this.baseUrl}/${id}`, theAdmin, options);
    }
    else {
      return EMPTY;
    }*/
  }

  /*
  deleteAdmin(id: number): Observable<any> {
    // need build URL based on the id
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }*/

  getAdminDetails(theAdminId: number): Observable<Admin> {
    const adminUrl = `${this.baseUrl}/details?theId=${theAdminId}`;
    return this.httpClient.get<Admin>(adminUrl);
  }


}

interface GetResponse {
  _embedded: {
    admins: Admin[];
  }
}
