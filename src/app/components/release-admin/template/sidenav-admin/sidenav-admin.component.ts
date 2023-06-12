import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarDataAdmin } from './nav-data-admin';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface SideNavToggle {
  screenWith: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav-admin',
  templateUrl: './sidenav-admin.component.html',
  styleUrls: ['./sidenav-admin.component.css']
})
export class SidenavAdminComponent  implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
    private router: Router,
    private authService: AuthService) {}

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWith = 0;
  navData = navbarDataAdmin;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWith = window.innerWidth;
    if (this.screenWith <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWith: this.screenWith });
    }
  }
  ngOnInit(): void {
    this.screenWith = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWith: this.screenWith });
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWith: this.screenWith });
  }

  dologout(): void {
    /*this.authService.signOut();
    this.tokenStorage.signOut();
    this.router.navigateByUrl(`home`);*/
  }
}
