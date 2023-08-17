import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { cours } from 'src/app/common/cours';
import { Manager } from 'src/app/common/manager';
import { CoursService } from 'src/app/services/cours.service';
import { ManagerService } from 'src/app/services/manager.service';
import { SharedProjetService } from 'src/app/services/shared-projet.service';

@Component({
  selector: 'app-add-edit-cours',
  templateUrl: './add-edit-cours.component.html',
  styleUrls: ['./add-edit-cours.component.css']
})
export class AddEditCoursComponent implements OnInit {
  isLoading: boolean = false;
  coursForm!: FormGroup;
  panelOpenState = false;
  projet: any;
  idProject !: any;
  manager!: Observable<Manager>;

  constructor(
    public dialogRef: MatDialogRef<AddEditCoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private coursService: CoursService,
    private formBuilder: FormBuilder,
    private sharedProjetService: SharedProjetService,
  ) {
    this.idProject = this.data.idpr;
    //console.log("###", this.idProject);
    //console.log("data :",data)
    this.coursForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      actor: [''],
    });
  }

  ngOnInit(): void {
    this.initUpdateForm();
  }

  initUpdateForm(): void {
    if (this.data.dataUpdated) {
      this.coursForm.patchValue(this.data.dataUpdated)
    } else {
      this.managerService.getManager(1).subscribe(
        result => {
          this.coursForm.patchValue({
            actor: result.firstName + " " + result.lastName
          });
        }
      )

    }
  }



  onFormSubmit(): void {
    this.isLoading = true;
    const managerId = 2;
    if (this.coursForm.valid) {
      if (this.data.dataUpdated) {
        //console.log("test update")

        this.coursService.updateCours(this.data.dataUpdated.id, this.sharedProjetService.projetId, this.coursForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Cours updated');
              this.dialogRef.close(true);
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
            }, 1000);

          }
        );
      }
      else {
        //console.log(this.coursForm.value)
        this.coursService.addCours(managerId, this.idProject, this.coursForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Cours added');
              this.dialogRef.close(true);
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log(error);
            }, 1000);

          });
      }
    }
  }

}
