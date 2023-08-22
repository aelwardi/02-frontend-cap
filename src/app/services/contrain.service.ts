import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contraint } from '../common/contraint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContrainService {
  private apiUrl = 'http://localhost:8080/contraint';

  constructor(private httpClient: HttpClient) { }

  getContraintByCoursId(coursId: number): Observable<Contraint> {
    return this.httpClient.get<Contraint>(`${this.apiUrl}?coursId=${coursId}`);
  }

  addContraint(coursId: number, theContraint: any): Observable<Object> {
    return this.httpClient.post(`${this.apiUrl}?coursId=${coursId}`, theContraint);
  }
  updateContraint(contraintId: number, coursId: number, theContraint: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}?contraintId=${contraintId}&coursId=${coursId}`, theContraint);
  }
  deleteContraint(contraintId: number, coursId: number) {
    return this.httpClient.delete(`${this.apiUrl}?contraintId=${contraintId}&coursId=${coursId}`);
  }
}
