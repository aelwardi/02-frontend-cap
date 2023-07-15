import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { cours } from 'src/app/common/cours';
import { CoursService } from 'src/app/services/cours.service';

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
  constructor(
    public dialogRef: MatDialogRef<AddEditCoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,

    private coursService: CoursService,
    private formBuilder: FormBuilder) {
       this.idProject = this.data.idpr;
      console.log("###",this.idProject);

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
  ngOnInit(): void {

    //throw new Error('Method not implemented.');

  }

  onFormSubmit(): void {
    if (this.data.dataUpdated) {

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
      this.coursService.addCours(this.idProject,coursData).subscribe(
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
