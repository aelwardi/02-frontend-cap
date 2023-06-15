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
    if (this.departementForm.valid) {
      if (this.data) {
        this.departementService.updateDepartement(this.data.id, this.departementForm.value).subscribe(
          response => {
            console.log('Department updated');
            this.dialogRef.close(true);
          },
          error => {
            console.log('Error');
          }
        );
      }
      else {
        this.departementService.addDepartement(this.departementForm.value).subscribe(
          response => {
            console.log('Department added');
            this.dialogRef.close(true);
          },
          error => {
            console.log('Error');
          }
        );
      }
    }
  }

}
