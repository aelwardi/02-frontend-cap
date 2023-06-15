import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Apprenant } from 'src/app/common/apprenant';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { ApprenantService } from 'src/app/services/apprenant.service';

@Component({
  selector: 'app-apprenant-details',
  templateUrl: './apprenant-details.component.html',
  styleUrls: ['./apprenant-details.component.css']
})
export class ApprenantDetailsComponent implements OnInit {
  detailsForm!: FormGroup;
  apprenant!: Apprenant;

  constructor(
    private apprenantService: ApprenantService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.detailsForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateBirth: [''],
      phone: [''],
      sexe: [''],
      email: [''],
      etat: [''],
      photo: [''],
      departement: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleManagerDetails();
    })
  }

  handleManagerDetails() {

    const theAdminId: number = +2;
    const theApprenantId: number = +this.route.snapshot.paramMap.get('id')!;
    this.apprenantService.getApprenantDetails(theAdminId, theApprenantId).subscribe(
      data => {
        this.apprenant = data;
        if (this.apprenant?.departement) {
          this.detailsForm.patchValue(this.apprenant);
          //console.log(this.manager);
        }
      }
    );
  }
}
