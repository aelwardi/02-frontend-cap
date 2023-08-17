import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private route: ActivatedRoute
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
        this.departementService.addDepartement(this.departementForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Department added');
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
    }
  }

}
