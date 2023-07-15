import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private AUTH_API = 'http://localhost:8080/auth';

  constructor(private tokenStorage: TokenStorageService, private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    //console.log(this.http.post(`${this.AUTH_API}/authenticate` , { email, password }, httpOptions));
    return this.http.post(`${this.AUTH_API}/authenticate` , { email, password }, httpOptions);
  }
  
  isUserLoggedIn() :boolean {
    return !!this.tokenStorage.getToken();
  }

  signOut(): any {
    return this.http.post(`${this.AUTH_API}/logout`, httpOptions);
  }

}
