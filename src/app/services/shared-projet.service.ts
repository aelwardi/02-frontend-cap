import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedProjetService {

  constructor() { }
  public projetId!: number;
}
