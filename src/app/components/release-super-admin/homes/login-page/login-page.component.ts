import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userLoggedIn = '';



  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginPageComponent>,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

  }

  submit() {
    this.dialogRef.close(true);
    this.router.navigateByUrl(`super-admin/departements`);
    /*
    if (this.form.status === 'VALID') {
      
      this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value).subscribe(
        (data) => {
          // console.log('Authentification réussie', data);
        
          this.tokenStorage.saveToken(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.userLoggedIn = <string>this.tokenStorage.getUsername();
          this.dialogRef.close(true);
          this.router.navigateByUrl(`super-admin/departements`);
          //console.log(this.userLoggedIn);
          //this.router.navigate([{ outlets: { primary: 'navbar', contenu: 'welcome' } }]);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }*/
  }
}
