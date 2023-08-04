import { Component,  Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  photoFile: File | undefined;
  currentPhotoUrl: string | undefined;
  projectForm!: FormGroup;
  department!: any;
  panelOpenState = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private projetService: ProjetService,
    private formBuilder: FormBuilder) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      nameClient: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      photo: [''],
      departement: ['']
    });
  }
  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchForm();
  }

  fetchForm(): void {
        this.projectForm.patchValue(this.data);
        if(this.data.photo){
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

  onFormSubmit():void {
    if (this.data) {
      if(this.projectForm.value.photo){
        this.projectForm.value.photo=this.projectForm.value.photo.substring(this.projectForm.value.photo.indexOf(',') + 1)
      }
      this.projetService.updateProject(this.data.id, this.projectForm.value).subscribe(
        response => {
          console.log('Project updated');
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error');
        }
      );
    }
    else {
      const projectData: Projet = {
        id: null,
        name: this.projectForm.value.name,
        nameClient: this.projectForm.value.nameClient,
        description: this.projectForm.value.description,
        photo: this.projectForm.value.photo.substring(this.projectForm.value.photo.indexOf(',') + 1),
        departement: this.department
      }
      this.projetService.addProject(projectData).subscribe(
          response => {
            console.log('project added');
            this.dialogRef.close(true);
          },
          error => {
            console.log(error);
          });
    }
  }

  fetchDepartments(): void {
    this.adminService.getDepartementByAdmin(+1)
      .subscribe(data => {

        this.department = data;
        // console.log(departements);
      },
        error => {
          console.log('Error occurred while loading departments:', error);
        }
      );
  }
}
