import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedChapitreService {

  constructor() { }
  public chapitreId!: number;
  public chapterName!: string;
}
