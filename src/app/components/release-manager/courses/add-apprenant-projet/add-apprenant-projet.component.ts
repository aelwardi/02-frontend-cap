import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManagerInfo } from 'src/app/common/manager-info';
import { ApprenantProjetService } from 'src/app/services/apprenant-projet.service';
import { SharedProjetService } from 'src/app/services/shared-projet.service';
import { AddManagerCoursComponent } from '../../chapitre/add-manager-cours/add-manager-cours.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-apprenant-projet',
  templateUrl: './add-apprenant-projet.component.html',
  styleUrls: ['./add-apprenant-projet.component.css']
})
export class AddApprenantProjetComponent implements OnInit {
  isLoading: boolean = false;
  apprenantInfo: ManagerInfo[] = [];
  assignmentForm!: FormGroup;

  constructor(
    private sharedProjetService: SharedProjetService,
    private apprenantProjetService: ApprenantProjetService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddManagerCoursComponent>,
    private _snackBar: MatSnackBar,
  ) {
    this.assignmentForm = this._formBuilder.group({
      apprenant: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getApprenantsByManagerAndNotInProject();
  }

  getApprenantsByManagerAndNotInProject() {
    this.apprenantProjetService.getApprenantsByManagerAndNotInProject(2, this.sharedProjetService.projetId).subscribe(
      data => {
        this.apprenantInfo = data;
      }
    )
  }

  onFormSubmit(): void {
    this.isLoading = true;
    if (this.assignmentForm.valid) {
      this.apprenantProjetService.addApprenantProjet(this.assignmentForm.value.apprenant.id, this.sharedProjetService.projetId).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log("Apprenant assigned");
            this._snackBar.open('Assignment added successfully.', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
            this.dialogRef.close(true);
          }, 1000);
        },
        error => {
          setTimeout(() => {
            this.isLoading = false;
            console.log(error);
            this._snackBar.open('Assignment addition unsuccessful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);

        });
    }
  }

}
