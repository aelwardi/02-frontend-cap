import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {Chapitre} from "../common/chapitre";
import {cours} from "../common/cours";

@Injectable({
  providedIn: 'root'
})
export class ChapitreService {
  private baseUrl = 'http://localhost:8080/chapitres';
  constructor(private httpClient: HttpClient,
              private tokenStorage: TokenStorageService
  ) { }

  getAllCours(): Observable<cours[]> {
    const url = `${this.baseUrl}/cours`;
    return this.httpClient.get<cours[]>(url);
  }

  getAllChapitres(): Observable<Chapitre[]> {
    return this.httpClient.get<Chapitre[]>(this.baseUrl);
  }

  // Récupérer les chapitres par ID de cours
  getChapitresByCoursId(coursId: number): Observable<Chapitre[]> {
    return this.httpClient.get<Chapitre[]>(`${this.baseUrl}/cours/${coursId}`);
  }

  addChapitreToCours(coursId: number, chapitre: any): Observable<any> {
    return this.httpClient.post<Chapitre>(`${this.baseUrl}/cours/${coursId}`, chapitre);
  }

  updateChapitre(theId: number, theChapitre: any): Observable<any> {
    return this.httpClient.put<Chapitre>(`${this.baseUrl}/${theId}`, theChapitre);
  }


  deleteChapitre(id: number, coursId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}/${coursId}`);
  }
}
