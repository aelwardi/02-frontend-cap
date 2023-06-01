import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api';
  private tokenKey = 'authToken';
  private roleKey = 'userRole';

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    console.log(this.http.post(`${this.apiUrl}/auth/authenticate`, credentials));
    return this.http.post(`${this.apiUrl}/auth/authenticate`, credentials);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  isAuthenticated(): boolean {
    // Vérifier si l'utilisateur est authentifié (par exemple, en vérifiant la présence d'un jeton d'authentification)
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // Renvoie true si le jeton existe, sinon false
  }

  hasRole(role: string): boolean {
    // Vérifier si l'utilisateur a le rôle spécifié
    const userRole = localStorage.getItem(this.roleKey);
    return userRole === role;
  }

  setAuthToken(token: string) {
    // Stocker le jeton d'authentification dans le stockage local
    localStorage.setItem(this.tokenKey, token);
  }

  setRole(role: string) {
    // Stocker le rôle de l'utilisateur dans le stockage local
    localStorage.setItem(this.roleKey, role);
  }

  clearAuthToken() {
    // Supprimer le jeton d'authentification du stockage local
    localStorage.removeItem(this.tokenKey);
  }

  clearRole() {
    // Supprimer le rôle de l'utilisateur du stockage local
    localStorage.removeItem(this.roleKey);
  }
}
