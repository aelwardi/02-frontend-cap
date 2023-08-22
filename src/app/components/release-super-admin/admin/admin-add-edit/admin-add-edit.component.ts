import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { SuperAdmin } from 'src/app/common/super-admin';
import { AdminService } from 'src/app/services/admin.service';
import { DepartementService } from 'src/app/services/departement.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-add-edit',
  templateUrl: './admin-add-edit.component.html',
  styleUrls: ['./admin-add-edit.component.css']
})
export class AdminAddEditComponent implements OnInit {
  isLoading: boolean = false;
  departements: any[] = [];
  password: string = '';
  adminForm!: FormGroup;
  passwordHidden: boolean = true;
  admin!: Admin;

  constructor(private _FormBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private departmentService: DepartementService,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar
  ) {
    this.adminForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateBirth: ['', Validators.required],
      phone: ['', Validators.required],
      sexe: ['', Validators.required],
      password: ['', Validators.required],
      departement: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.adminForm.patchValue(this.data);
    this.generatePassword();
    this.fetchDepartments();
  }

  onFormSubmit(): void {
    this.isLoading = true;
    const superAdminId = 1;
    // if (this.adminForm.valid) {
    if (!this.admin) {
      this.admin = new Admin(1);
    }

    this.admin.firstName = this.adminForm.value.firstName;
    this.admin.lastName = this.adminForm.value.lastName;
    this.admin.dateBirth = this.adminForm.value.dateBirth;
    this.admin.email = this.adminForm.value.email;
    this.admin.phone = this.adminForm.value.phone;
    this.admin.sexe = this.adminForm.value.sexe;
    this.admin.password = this.adminForm.value.password;
    if (this.data) {
      console.log(this.admin);
      this.adminService.updateAdmin(superAdminId, this.data.id, this.admin).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Admins updated');
            this._snackBar.open('Administrator updated successfully.', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
            this.dialogRef.close(true);
          }, 1000);
        },
        error => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Error');
            this._snackBar.open('Administrator update unsuccessful..', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);
        }
      );
    }

    else {
      //const json = JSON.stringify(superAdmin.toJSON());
      const adminData: Admin = {
        id: null,
        firstName: this.adminForm.value.firstName,
        lastName: this.adminForm.value.lastName,
        dateBirth: this.adminForm.value.dateBirth,
        phone: this.adminForm.value.phone,
        sexe: this.adminForm.value.sexe,
        email: this.adminForm.value.email,
        password: this.adminForm.value.password,
        etat: true,
        role: 'ADMIN',
        departement: this.adminForm.value.departement,
      };
      //console.log(adminData);
      this.adminService.addAdmin(superAdminId, adminData).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Admin added');
            this._snackBar.open('Administrator added successfully.', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
            this.dialogRef.close(true);
          }, 1000);
        },
        error => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Error');
            this._snackBar.open('Administrator addition unsuccessful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);
        }
      );
    }


  }

  generatePassword(): void {
    // Generate a random password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.password = password;

    // Update the form control value
    this.adminForm.controls['password'].setValue(this.password);
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  fetchDepartments(): void {
    this.departmentService.getDepartementList()
      .subscribe(departements => {

        this.departements = departements;
        // console.log(departements);
      },
        error => {
          console.log('Error occurred while loading departments:', error);
        }
      );
  }
}
