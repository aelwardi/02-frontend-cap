import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Apprenant } from 'src/app/common/apprenant';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { DepartementService } from 'src/app/services/departement.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-apprenant-add-edit',
  templateUrl: './apprenant-add-edit.component.html',
  styleUrls: ['./apprenant-add-edit.component.css']
})
export class ApprenantAddEditComponent {

  departements: any[] = [];
  password: string = '';
  apprenantForm!: FormGroup;
  passwordHidden: boolean = true;

  constructor(private _FormBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ApprenantAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apprenantService: ApprenantService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private departmentService: DepartementService,
    private tokenStorage: TokenStorageService
  ) {
    this.apprenantForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      DateBirth: ['', Validators.required],
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
  }

  onFormSubmit(): void {
    // if (this.adminForm.valid) {
    if (this.data) {
      this.apprenantService.updateApprenant(this.data.id, this.apprenantForm.value).subscribe(
        response => {
          console.log('Apprenants updated');
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error');
        }
      );
    }
    //}

    else {
      //const superAdmin = new SuperAdmin(1);
      //const json = JSON.stringify(superAdmin.toJSON());
      const apprenantData: Apprenant = {
        // id: null,
        firstName: this.apprenantForm.value.firstName,
        lastName: this.apprenantForm.value.lastName,
        DateBirth: this.apprenantForm.value.dateBirth,
        phone: this.apprenantForm.value.phone,
        sexe: this.apprenantForm.value.sexe,
        photo: null,
        email: this.apprenantForm.value.email,
        password: this.apprenantForm.value.password,
        etat: true,
        role: 'APPRENANT',
        departement: this.apprenantForm.value.departement,
        //superAdmin: superAdmin
      };
      this.apprenantService.addApprenant(apprenantData).subscribe(
        response => {
          console.log('Apprenant added');
          console.log(apprenantData);
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
    this.departmentService.getDepartementList()
      .subscribe(departements => {

        this.departements = departements;
        console.log(departements);
      },
        error => {
          console.log('Error occurred while loading departments:', error);
        }
      );
  }
}
