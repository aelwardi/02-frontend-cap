import { Injectable } from '@angular/core';
import { Token } from '../common/token';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: Token): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    //console.log(JSON.stringify(token));
  }

  public getToken() {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  public getTokenValue() {
    const token = this.getToken();
    if (token) {
      return token.token;
    }
    return null;
  }
// get role
  public getRoles() {
    const token = this.getTokenValue();
    const decodedToken: any = jwt_decode(token);
    if (token) {
      return decodedToken.role;
    }
    return null;
  }

  // get id
  public getId() {
    const token = this.getTokenValue();
    const decodedToken: any = jwt_decode(token);
    if (token) {
      return decodedToken.id;
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const token = this.getTokenValue();
    if(token) {
      return true;
    }
    else {
      return false;
    }
  }

  public getUsername(): string | null {
    const token=this.getTokenValue();
    const decodedToken: any = jwt_decode(token);
    // console.log(decodedToken.sub);
    if (token) {
      return decodedToken.sub;
    }
    return null;
  }

  public hasRole(role:string): boolean | null {
    const token=this.getTokenValue();
    const decodedToken: any = jwt_decode(token);
    if (token) {
      console.log('token.roles',decodedToken.role);
      console.log('token.roles.includes(role)',token.roles.includes(role));
      return decodedToken.role.includes(role);
      }
      return null;
      }
}
