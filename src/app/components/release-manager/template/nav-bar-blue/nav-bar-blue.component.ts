import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-nav-bar-blue',
  templateUrl: './nav-bar-blue.component.html',
  styleUrls: ['./nav-bar-blue.component.css']
})
export class NavBarBlueComponent {
  isHandset$: Observable<boolean>;
  showNavbarContent = false;
  showSearchBar = false;
  idProject:number | undefined;
  constructor(
    private router: Router,
    private routee:ActivatedRoute,
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
    console.log("test from search")
    this.routee.params.subscribe(params => {
      this.idProject = params['idProject'];
    })
    this.router.navigateByUrl(`/project/${this.idProject}/cours/search/${term}`)
  }

  redirectToProjects() {
    this.router.navigateByUrl(`manager/projects`);
  }
  redirectToHelps() {
    this.router.navigateByUrl(`manager/help`);
  }
}
