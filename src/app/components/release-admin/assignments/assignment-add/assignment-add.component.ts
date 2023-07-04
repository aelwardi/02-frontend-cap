import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Apprenant } from 'src/app/common/apprenant';
import { ManagerApprenantService } from 'src/app/services/manager-apprenant.service';

@Component({
  selector: 'app-assignment-add',
  templateUrl: './assignment-add.component.html',
  styleUrls: ['./assignment-add.component.css']
})
export class AssignmentAddComponent implements OnInit {

  assignmentForm!: FormGroup;
  apprenants: any[] = [];

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private managerApprenantService: ManagerApprenantService,
    private route: ActivatedRoute
  ) {
    this.assignmentForm = this._formBuilder.group({
      apprenant: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.fetchApprenants();
    } else {
      console.log('Invalid data or missing manager ID');
    }
  }

  fetchApprenants(): void {
    const theAdminId: number = +2;
    if (this.data && this.data.id) {
      this.managerApprenantService.getApprenantsCleans(theAdminId, this.data.id)
        .subscribe(apprenant => {
          this.apprenants = apprenant;
        },
          error => {
            console.log('Error occurred while loading apprenants:', error);
          });
    } else {
      console.log('Invalid data or missing manager ID');
    }
  }

  getManagerName(): string {
    if (this.data) {
      const manager = this.data;
      return `${manager.firstName} ${manager.lastName}`;
    }
    return '';
  }

  onFormSubmit(): void {

    if (this.assignmentForm.valid) {
      const theApprenantId = this.assignmentForm.value.apprenant.id;
      const theManagerId = this.data.id;
      this.managerApprenantService.addNewAssignment(theManagerId, theApprenantId).subscribe(
        response => {
          console.log('Assignment added');
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error', error);
        }
      );
    }
  }

}
