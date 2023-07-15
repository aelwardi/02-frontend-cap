import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Manager } from 'src/app/common/manager';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-manager-details',
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.css']
})
export class ManagerDetailsComponent implements OnInit {
  detailsForm!: FormGroup;
  manager!: Manager;

  constructor(
    private managerService: ManagerService,
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
    const theManagerId: number = +this.route.snapshot.paramMap.get('id')!;
    this.managerService.getManagerDetails(theAdminId , theManagerId).subscribe(
      data => {
        this.manager = data;
        if (this.manager?.departement) {
          this.detailsForm.patchValue(this.manager);
          //console.log(this.manager);
        }
      }
    );
  }
}
