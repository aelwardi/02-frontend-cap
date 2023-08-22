import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contraint } from 'src/app/common/contraint';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { ContrainService } from 'src/app/services/contrain.service';

@Component({
  selector: 'app-contraint',
  templateUrl: './contraint.component.html',
  styleUrls: ['./contraint.component.css']
})
export class ContraintComponent implements OnInit  {
  isLoading: boolean = false;
  contraintForm!: FormGroup;
  contraint!: Contraint;

  constructor(
    public dialogRef: MatDialogRef<ContraintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private contraintService: ContrainService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.contraintForm = this.formBuilder.group({
      startCourse: ['', Validators.required],
      endCourse: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if(this.data.coursId){
      this.checkContraint(this.data.coursId);
    }
  }

  checkContraint(id: number) {
    this.contraintService.getContraintByCoursId(id).subscribe(
      data => {
        this.contraint = data;
        if(this.contraint.id) {
          this.contraintForm.patchValue(this.contraint)
        }
      }
    )
  }

  onFormSubmit(): void {
    this.isLoading = true;
    if(this.contraint.id){
      this.contraintService.updateContraint(this.contraint.id, this.data.coursId, this.contraintForm.value).subscribe(
        {next: (res) => {
          setTimeout(() => {
            this.isLoading = false;
            console.log("Contraint updated");
            this._snackBar.open('Contraint updated successfully.', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
          this.dialogRef.close(true);
          }, 1000);
        },
        error: (err) => {
          setTimeout(() => {
            this.isLoading = false;
            this._snackBar.open('Contraint update unsuccessful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);
        }}
      )
    }else {
      this.contraintService.addContraint(this.data.coursId, this.contraintForm.value).subscribe(
        {next: (res) => {
          setTimeout(() => {
            this.isLoading = false;
            console.log("contraint added!");
            this._snackBar.open('Contraint added successfully.', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
          this.dialogRef.close(true);
          }, 1000);
        },
        error: (err) => {
          setTimeout(() => {
            this.isLoading = false;
            this._snackBar.open('Contraint addition unsuccessful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);
        }}
      )
    }
  }

  openConfirmationDialog(contraintId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteContraint(contraintId);
      }
    });
  }

  deleteContraint(contraintId: number) {
    this.isLoading = true;
    this.contraintService.deleteContraint(contraintId, this.data.coursId).subscribe(
      {next: (res) => {
        setTimeout(() => {
          this.isLoading = false;
          console.log("contraint deleted!");
          this._snackBar.open('Contraint deleted successfully.', '', {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });
        this.dialogRef.close(true);
        }, 1000);
      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading = false;
          this._snackBar.open('Contraint delete unsuccessful.', '', {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        }, 1000);
      }}
    )
  }

}
