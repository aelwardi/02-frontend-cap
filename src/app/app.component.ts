import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private titleService: Title) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const title = this.getTitle(this.router.routerState, this.router.routerState.root);
      this.titleService.setTitle(`${title} - Capgemini`);
    });
  }

  private getTitle(state: any, parent: any): string {
    const data = [];

    if (parent && parent.snapshot.data && parent.snapshot.data.pageTitle) {
      data.push(parent.snapshot.data.pageTitle);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }

    return data.join('');
  }
}
