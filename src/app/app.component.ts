import { Component } from '@angular/core';

interface SideNavToggle {
  screenWith: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lifesciences';

  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWith;
    this.isSideNavCollapsed = data.collapsed;
  }
}
