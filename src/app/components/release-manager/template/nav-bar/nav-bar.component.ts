import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjetService } from 'src/app/services/projet.service';
import { Projet } from 'src/app/common/projet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isHandset$: Observable<boolean>;
  showNavbarContent = false;
  showSearchBar = false;

  constructor(
    private router: Router,
    private projetService: ProjetService,
    private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  toggleNavbarContent(): void {
    this.showNavbarContent = !this.showNavbarContent;
  }

  searchProjects(searchTerm: string): void {
    this.router.navigateByUrl(`manager/projects/search/${searchTerm}`);
  }

}
