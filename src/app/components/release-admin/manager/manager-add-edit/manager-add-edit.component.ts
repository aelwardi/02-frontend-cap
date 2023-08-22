import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { Manager } from 'src/app/common/manager';
import { AdminService } from 'src/app/services/admin.service';
import { ManagerService } from 'src/app/services/manager.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-manager-add-edit',
  templateUrl: './manager-add-edit.component.html',
  styleUrls: ['./manager-add-edit.component.css']
})
export class ManagerAddEditComponent implements OnInit {
  isLoading: boolean = false;
  departement: any;
  password: string = '';
  managerForm!: FormGroup;
  passwordHidden: boolean = true;
  manager!: Manager;

  constructor(private _FormBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ManagerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private adminService: AdminService,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar
  ) {
    this.managerForm = this._FormBuilder.group({
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
    this.managerForm.patchValue(this.data);
    this.generatePassword();
    this.fetchDepartments();
    this.handleManagerById();
  }

  handleManagerById(): void {
    if (this.data) {
      this.managerService.getManager(this.data.id).subscribe(
        data => {
          this.manager = data;
          this.managerForm.patchValue(this.manager);
          //console.log(this.manager);
        }
      );
    }
  }
  onFormSubmit(): void {
    this.isLoading = true;
    const adminId = 2;
    // if (this.managerForm.valid) {
    if (this.data) {
      this.manager.firstName = this.managerForm.value.firstName;
      this.manager.lastName = this.managerForm.value.lastName;
      this.manager.dateBirth = this.managerForm.value.dateBirth;
      this.manager.email = this.managerForm.value.email;
      this.manager.phone = this.managerForm.value.phone;
      this.manager.sexe = this.managerForm.value.sexe;
      this.manager.password = this.managerForm.value.password;
      this.managerService.updateManager(adminId, this.manager.id, this.manager).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Manager updated');
            this._snackBar.open('Manager updated successfully.', '', {
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
            this._snackBar.open('Profile updated unsuccessfully.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);

        }
      );
    }

    else {
      const managerData: Manager = {
        id: null,
        firstName: this.managerForm.value.firstName,
        lastName: this.managerForm.value.lastName,
        dateBirth: this.managerForm.value.dateBirth,
        phone: this.managerForm.value.phone,
        sexe: this.managerForm.value.sexe,
        photo: null,
        email: this.managerForm.value.email,
        password: this.managerForm.value.password,
        etat: true,
        role: 'MANAGER',
        departement: this.managerForm.value.departement,
      };
      //console.log(managerData);
      this.managerService.addManager(adminId, managerData).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Manager added');
            this._snackBar.open('Manager added successfully.', '', {
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
            this._snackBar.open('Manager addition unsuccessful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);
        }
      );
      //console.log(managerData);
    }
    // }


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
    this.managerForm.controls['password'].setValue(this.password);
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  fetchDepartments(): void {
    this.adminService.getDepartementByAdmin(+2).subscribe(
      data => {
        this.departement = data;
        // console.log(departements);
      },
      error => {
        console.log('Error occurred while loading departments:', error);
      }
    );
  }
}
