import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  showLogin = false;

  constructor(private dialog: MatDialog) { }

  openLogin() {
    const dialogRef = this.dialog.open(LoginPageComponent, {
      width: '400px' // Ajustez la largeur du modal selon vos besoins
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermé');
      // Faire quelque chose après la fermeture du modal, si nécessaire
    });
  }


}
