import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface SideNavToggle {
  screenWith: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private tokenStorage: TokenStorageService,
    private router: Router,
    private authService: AuthService) {}

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWith = 0;
  navData = navbarData;

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
  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigateByUrl(`home`);
    }, 3000);
  }

  dologout(): void {
    /*this.authService.signOut();
    this.tokenStorage.signOut();
    this.router.navigateByUrl(`home`);*/
  }
}
