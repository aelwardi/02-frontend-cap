import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-body-welcome-card',
  templateUrl: './body-welcome-card.component.html',
  styleUrls: ['./body-welcome-card.component.css']
})
export class BodyWelcomeCardComponent {

  numberOfColumns = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches ? 1 : 2) 
  );

  cardsData = [
    {
      title: "Lorem ipsum dolor sit amet",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
      ico: "assets/images/icos/ico-01.png"
    },
    {
      title: "Lorem ipsum dolor sit amet",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
      ico: "assets/images/icos/ico-02.png"
    },
    {
      title: "Lorem ipsum dolor sit amet",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  ",
      ico: "assets/images/icos/ico-03.png"
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

}
