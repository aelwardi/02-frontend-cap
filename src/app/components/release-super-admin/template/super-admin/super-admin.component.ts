import { Component } from '@angular/core';

interface SideNavToggle {
  screenWith: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWith;
    this.isSideNavCollapsed = data.collapsed;
  }

}