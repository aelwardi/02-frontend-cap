import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isHandset$: Observable<boolean>;
  showNavbarContent = false;
  showSearchBar = false;

  constructor(
    private router: Router,
    // private projetService: ProjetService,
    private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  toggleNavbarContent(): void {
    this.showNavbarContent = !this.showNavbarContent;
  }

  searchCours(term: string): void {
    this.router.navigateByUrl(`/cours/search/${term}`);
  }


}

