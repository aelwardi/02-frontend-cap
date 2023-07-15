import { Component } from '@angular/core';

interface SideNavToggle {
  screenWith: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWith;
    this.isSideNavCollapsed = data.collapsed;
  }
}
