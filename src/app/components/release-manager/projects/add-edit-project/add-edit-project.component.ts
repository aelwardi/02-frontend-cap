import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/common/projet';
import { AdminService } from 'src/app/services/admin.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css']
})
export class AddEditProjectComponent implements OnInit {
  isLoading: boolean = false;
  photoFile: File | undefined;
  currentPhotoUrl: string | undefined;
  projectForm!: FormGroup;
  panelOpenState = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private projetService: ProjetService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      nameClient: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      photo: ['']
    });
  }
  ngOnInit(): void {
    this.fetchForm();
  }

  fetchForm(): void {
    this.projectForm.patchValue(this.data);
    if (this.data.photo) {
      this.currentPhotoUrl = `data:image/jpeg;base64,${this.data.photo}`;
    }
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
      this.projectForm.patchValue({ photo: imageData });
    };

    reader.readAsDataURL(file);
  }

  onFormSubmit(): void {
    this.isLoading = true;
    const managerId = 2;
    if (this.data) {
      if (this.projectForm.value.photo) {
        this.projectForm.value.photo = this.projectForm.value.photo.substring(this.projectForm.value.photo.indexOf(',') + 1)
      }
      this.projetService.updateProject(this.data.id, this.projectForm.value).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Project updated');
            this._snackBar.open('Project updated successfully.', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
            this.dialogRef.close(true);
          }, 1000);
        },
        error => {
          setTimeout(() => {
            this.isLoading = false;
            this._snackBar.open('Project update successful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
            console.log('Error');
          }, 1000);
          
        }
      );
    }
    else {
      const projectData: Projet = {
        id: null,
        name: this.projectForm.value.name,
        nameClient: this.projectForm.value.nameClient,
        description: this.projectForm.value.description,
        photo: this.projectForm.value.photo.substring(this.projectForm.value.photo.indexOf(',') + 1)
      }
      //console.log(projectData);
      this.projetService.addProject(managerId, projectData).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('project added');
            this._snackBar.open('Project added successfully.', '', {
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
            this._snackBar.open('Project addition unsuccessful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);

        });
    }
  }
}
