import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.startRandomNumberLoop();
  }

  startRandomNumberLoop(): void {
    let time = 30;
    let i = 0;
    let selector3 = document.querySelector('.thirdDigit') as HTMLElement;
    let selector2 = document.querySelector('.secondDigit') as HTMLElement;
    let selector1 = document.querySelector('.firstDigit') as HTMLElement;

    let loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = '4';
      } else {
        selector3.textContent = this.randomNum().toString();
        i++;
      }
    }, time);
    let loop2 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop2);
        selector2.textContent = '0';
      } else {
        selector2.textContent = this.randomNum().toString();
        i++;
      }
    }, time);
    let loop1 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop1);
        selector1.textContent = '4';
      } else {
        selector1.textContent = this.randomNum().toString();
        i++;
      }
    }, time);

  }

  randomNum(): number {
    return Math.floor(Math.random() * 9) + 1;
  }
}