import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Departement } from 'src/app/common/departement';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-departement-add-edit',
  templateUrl: './departement-add-edit.component.html',
  styleUrls: ['./departement-add-edit.component.css']
})
export class DepartementAddEditComponent implements OnInit {
  isLoading: boolean = false;
  departementForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DepartementAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departementService: DepartementService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.departementForm = this._formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.departementForm.patchValue(this.data);
  }

  onFormSubmit(): void {
    this.isLoading = true;
    if (this.departementForm.valid) {
      if (this.data) {
        this.departementService.updateDepartement(this.data.id, this.departementForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Department updated');
              this._snackBar.open('Department successfully updated.', '', {
                duration: 2000,
                panelClass: ['green-snackbar'],
              });
              this.dialogRef.close(true);
            }, 1000);

          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
              this._snackBar.open('Department update unsuccessful.', '', {
                duration: 2000,
                panelClass: ['red-snackbar'],
              });
            }, 1000);
          }
        );
      }
      else {
        this.departementService.addDepartement(this.departementForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Department added');
              this._snackBar.open('Department added successfully.', '', {
                duration: 2000,
                panelClass: ['green-snackbar'],
              });
              this.dialogRef.close(true);
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
              this._snackBar.open('Department addition not completed.', '', {
                duration: 2000,
                panelClass: ['red-snackbar'],
              });
            }, 1000);
          }
        );
      }
    }
  }

}
