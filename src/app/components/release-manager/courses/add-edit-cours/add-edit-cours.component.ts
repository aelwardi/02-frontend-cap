import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  photoFile: File | undefined;
  currentPhotoUrl: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddEditCoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private coursService: CoursService,
    private formBuilder: FormBuilder,
    private sharedProjetService: SharedProjetService,
    private _snackBar: MatSnackBar,
  ) {
    this.idProject = this.data.idpr;
    this.coursForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      actor: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
    this.initUpdateForm();
  }

  uploadPhoto() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', (event: any) => {
      this.photoFile = event.target.files[0];
      if (this.photoFile) {
        this.handleImageUpload(this.photoFile);
      }
    });

    fileInput.click();
  }

  handleImageUpload(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result as string;
      this.currentPhotoUrl = imageData;
      this.coursForm.patchValue({ photo: imageData });
    };

    reader.readAsDataURL(file);
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
        if (this.coursForm.value.photo) {
          this.coursForm.value.photo = this.coursForm.value.photo.substring(this.coursForm.value.photo.indexOf(',') + 1)
        }
        this.coursService.updateCours(this.data.dataUpdated.id, this.sharedProjetService.projetId, this.coursForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Cours updated');
              this._snackBar.open('Course updated successfully.', '', {
                duration: 3000,
                panelClass: ['green-snackbar'],
              });
              this.dialogRef.close(true);
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
              this._snackBar.open('Course update unsuccessful.', '', {
                duration: 3000,
                panelClass: ['red-snackbar'],
              });
            }, 1000);

          }
        );
      }
      else {
        this.coursService.addCours(managerId, this.idProject, this.coursForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Cours added');
              this._snackBar.open('Course added successfully', '', {
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
              this._snackBar.open('Course addition unsuccessful.', '', {
                duration: 3000,
                panelClass: ['red-snackbar'],
              });
            }, 1000);

          });
      }
    }
  }

}
