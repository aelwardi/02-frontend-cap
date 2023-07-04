import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
  detailsForm!: FormGroup;
  admin!: Admin;

  constructor(
    private adminServie: AdminService,
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
      this.handleAdminDetails();
    })
  }

  handleAdminDetails() {


    const theAdminId: number = +this.route.snapshot.paramMap.get('id')!;
    this.adminServie.getAdminDetails(theAdminId).subscribe(
      data => {
        this.admin = data;
        if (this.admin?.departement) {
          this.detailsForm.patchValue(this.admin);
          //console.log(this.manager);
        }
      }
    );
  }
}
