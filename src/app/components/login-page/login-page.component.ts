import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email!: string;
  password!: string;
  rememberMe: boolean = false;
  error!: string;
  
  @Output() loginEvent = new EventEmitter<{ email: string, password: string }>();

  constructor(public dialogRef: MatDialogRef<LoginPageComponent>, private authService: AuthService) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      response => {/*
        // Succès de l'authentification
      const token = response.token; // Supposons que le jeton d'authentification est renvoyé dans la réponse
      const role = response.role; // Supposons que le rôle de l'utilisateur est renvoyé dans la réponse

      // Stocker le jeton d'authentification et le rôle de l'utilisateur dans le stockage local
      this.authService.setAuthToken(token);
      this.authService.setRole(role);

      // Rediriger vers la page appropriée en fonction du rôle de l'utilisateur
      if (role === 'SUPERADMIN') {
        // Rediriger vers la page du superadmin
        this.router.navigate(['/super-admin']);
      } else {
        // Rediriger vers une autre page en fonction du rôle de l'utilisateur
      }*/
      },
      error => {
        this.error = 'Invalid username or password';
      }
    );
  }
}
