import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-apprenant',
  templateUrl: './search-apprenant.component.html',
  styleUrls: ['./search-apprenant.component.css']
})
export class SearchApprenantComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`admin/apprenants/search-apprenant/${value}`);
  }
}
