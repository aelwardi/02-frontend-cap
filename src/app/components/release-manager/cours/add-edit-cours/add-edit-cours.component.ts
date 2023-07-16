import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { cours } from 'src/app/common/cours';
import { Manager } from 'src/app/common/manager';
import { CoursService } from 'src/app/services/cours.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-add-edit-cours',
  templateUrl: './add-edit-cours.component.html',
  styleUrls: ['./add-edit-cours.component.css']
})
export class AddEditCoursComponent implements OnInit {
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
    private formBuilder: FormBuilder) {
    this.idProject = this.data.idpr;
    console.log("###", this.idProject);

    this.coursForm = this.formBuilder.group({
      title: ['', Validators.required],
      dateMAJ: [new Date()],
      description: ['', Validators.maxLength(500)],
      dateCreate: [new Date()],
      //estimateTime:[''],
      url: [''],
      actor: [''],
      Projet: [''],

    });
  }
  private getManagerFullName(managerId: number): Observable<string> {
    return this.managerService.getManager(managerId).pipe(
      map(manager => `${manager.firstName} ${manager.lastName}`)
    );
  }
  ngOnInit(): void {

    this.getManagerFullName(1).subscribe(fullName => {
      this.coursForm.patchValue({
        actor: fullName
      });
    });

  }

  onFormSubmit(): void {
    if (this.data.dataUpdated) {
      this.coursForm.patchValue({
        dateMAJ: new Date() // Set the current date as the new value for dateMAJ
      });

      this.coursService.updateCours(this.data.id, this.coursForm.value).subscribe(
        response => {
          console.log('Cours updated');
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error');
        }
      );
    }
    else {
      const coursData: cours = {
        id: null,
        title: this.coursForm.value.title,
        dateMAJ: this.coursForm.value.dateMAJ,
        description: this.coursForm.value.description,
        dateCreate: this.coursForm.value.dateCreate,
        estimateTime: this.coursForm.value.estimateTime,
        url: this.coursForm.value.url,
        actor: this.coursForm.value.actor,

      }
      this.coursService.addCours(this.idProject, coursData).subscribe(
        response => {
          console.log('Cours added');
          this.dialogRef.close(true);
        },
        error => {
          console.log(error);
        });
    }
  }

}
