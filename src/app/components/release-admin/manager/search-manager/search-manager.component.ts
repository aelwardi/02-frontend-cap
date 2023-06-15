import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-manager',
  templateUrl: './search-manager.component.html',
  styleUrls: ['./search-manager.component.css']
})
export class SearchManagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`admin/managers/search/${value}`);
  }
}
