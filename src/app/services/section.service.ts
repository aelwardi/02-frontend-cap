import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChapitreDTO } from '../common/chapitre-dto';
import { Section } from '../common/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private baseUrl = 'http://localhost:8080/sections'
  constructor(private httpClient: HttpClient) { }

  getChapitreWithSection(cousId: number): Observable<ChapitreDTO[]> {
    const chapitreDTOUrl = `${this.baseUrl}?cousId=${cousId}`; 
    return this.httpClient.get<ChapitreDTO[]>(chapitreDTOUrl);
  }

  getSection(theId: number): Observable<Section>{
    const sectionURL = `${this.baseUrl}/${theId}`;

    return this.httpClient.get(sectionURL);
  }

  addSection(chapitreId: number, theSection: any): Observable<any> {
    const addURL = `${this.baseUrl}?chapitreId=${chapitreId}`;
    return this.httpClient.post(addURL, theSection);
  }

  deleteSection(id: number, chapitreId: number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${id}/${chapitreId}`;
    return this.httpClient.delete(deleteUrl);
  }

  updateSection(id: number, chapitreId: number, theSection: any): Observable<any> {
    const updateUrl = `${this.baseUrl}/${chapitreId}/${id}`;
    //console.log(updateUrl);
    return this.httpClient.put(updateUrl, theSection);
  }
}
