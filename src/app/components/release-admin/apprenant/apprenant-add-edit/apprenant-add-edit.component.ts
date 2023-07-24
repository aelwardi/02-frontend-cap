import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { Apprenant } from 'src/app/common/apprenant';
import { AdminService } from 'src/app/services/admin.service';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { DepartementService } from 'src/app/services/departement.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-apprenant-add-edit',
  templateUrl: './apprenant-add-edit.component.html',
  styleUrls: ['./apprenant-add-edit.component.css']
})
export class ApprenantAddEditComponent implements OnInit {

  departement: any;
  password: string = '';
  apprenantForm!: FormGroup;
  passwordHidden: boolean = true;
  apprenant!: Apprenant;

  constructor(private _FormBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ApprenantAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apprenantService: ApprenantService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private adminService: AdminService,
    private tokenStorage: TokenStorageService
  ) {
    this.apprenantForm = this._FormBuilder.group({
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
    this.apprenantForm.patchValue(this.data);
    this.generatePassword();
    this.fetchDepartments();
    this.handleApprenantById();

  }

  handleApprenantById(): void {
    if (this.data && this.data.id) { // Check if this.data and this.data.id are not null or undefined
      this.apprenantService.getApprenantById(this.data.id).subscribe(
        data => {
          this.apprenant = data;
          this.apprenantForm.patchValue(this.apprenant);
          console.log(this.apprenant);
        },
        error => {
          console.log('Error occurred while fetching apprenant:', error);
        }
      );
    } else {
      console.log('Data or ID is null or undefined.');
      // Handle the case when this.data or this.data.id is null or undefined.
    }
  }




  onFormSubmit(): void {
    // if (this.adminForm.valid) {
    if (this.data) {
      this.apprenant.firstName = this.apprenantForm.value.firstName;
      this.apprenant.lastName = this.apprenantForm.value.lastName;
      this.apprenant.dateBirth = this.apprenantForm.value.dateBirth;
      this.apprenant.email = this.apprenantForm.value.email;
      this.apprenant.phone = this.apprenantForm.value.phone;
      this.apprenant.sexe = this.apprenantForm.value.sexe;
      this.apprenant.password = this.apprenantForm.value.password;
      this.apprenantService.updateApprenant(this.apprenant.id, this.apprenant).subscribe(
        response => {
          console.log('apprenant updated');
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error');
        }
      );
    }
    //}

    else {
      const admin = new Admin(1);
      const apprenantData: Apprenant = {
        id: null,
        firstName: this.apprenantForm.value.firstName,
        lastName: this.apprenantForm.value.lastName,
        dateBirth: this.apprenantForm.value.dateBirth,
        phone: this.apprenantForm.value.phone,
        sexe: this.apprenantForm.value.sexe,
        photo: null,
        email: this.apprenantForm.value.email,
        password: this.apprenantForm.value.password,
        etat: true,
        role: 'APPRENANT',
        departement: this.apprenantForm.value.departement,
        admin: admin
      };
      console.log(apprenantData);
      this.apprenantService.addApprenant(apprenantData).subscribe(
        response => {
          console.log('Apprenant added');
          //console.log(apprenantData);
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error');
        }
      );
      console.log(apprenantData);
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
    this.apprenantForm.controls['password'].setValue(this.password);
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  // pour assigner chaque apprenant a une departement
  fetchDepartments(): void {
    this.adminService.getDepartementByAdmin(+1)
      .subscribe(data => {

        this.departement = data;
        console.log(data);
      },
        error => {
          console.log('Error occurred while loading departments:', error);
        }
      );
  }
}
