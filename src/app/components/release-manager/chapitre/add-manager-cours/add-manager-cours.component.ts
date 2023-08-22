import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerInfo } from 'src/app/common/manager-info';
import { GestionChapitreService } from 'src/app/services/gestion-chapitre.service';
import { ManagerCoursService } from 'src/app/services/manager-cours.service';

@Component({
  selector: 'app-add-manager-cours',
  templateUrl: './add-manager-cours.component.html',
  styleUrls: ['./add-manager-cours.component.css']
})
export class AddManagerCoursComponent implements OnInit {
  isLoading: boolean = false;
  managerInfo: ManagerInfo[] = [];
  assignmentForm!: FormGroup;

  constructor(
    private gestionChapitreService: GestionChapitreService,
    private managerCoursService: ManagerCoursService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddManagerCoursComponent>,
    private _snackBar: MatSnackBar,
  ){
    this.assignmentForm = this._formBuilder.group({
      manager: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getNoAssignmentManagerCours();
  }

  getNoAssignmentManagerCours() {
    this.managerCoursService.getNoAssignmentManagerCours(this.gestionChapitreService.coursId).subscribe(
      data => {
        this.managerInfo = data;
      }
    )
  }
  
  onFormSubmit(): void{
    this.isLoading = true;
    if(this.assignmentForm.valid){
      this.managerCoursService.addNewAssignment(this.assignmentForm.value.manager.id, this.gestionChapitreService.coursId).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log("Apprenant assigned");
            this._snackBar.open('Manager added successfully.', '', {
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
            this._snackBar.open('Manager addition unsuccessfully.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);

        });
    }
  }
}
