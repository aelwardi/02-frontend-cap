import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm!: FormGroup;
  admin!: Admin;
  photoFile: File | undefined;
  currentPhotoUrl: string | undefined;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.profileForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateBirth: ['', Validators.required],
        phone: ['', Validators.required],
        sexe: ['', Validators.required],
        email: ['', Validators.required],
        etat: ['', Validators.required],
        photo: ['']
      });
     }

     ngOnInit() {
      this.route.paramMap.subscribe(() => {
        this.handleAdminDetails();
      })
    }

    handleAdminDetails() {

      const theAdminId: number = +2;
  
      this.adminService.getAdmin(theAdminId).subscribe(
        data => {
          this.admin = data;
          this.profileForm.patchValue(this.admin);
          console.log(this.admin);
        }
      );
    }

    onFormSubmit(): void {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // call method update
          this.admin.dateBirth = this.profileForm.value.dateBirth;
          this.admin.phone = this.profileForm.value.phone;
          this.admin.sexe = this.profileForm.value.sexe;
          this.admin.photo = this.profileForm.value.photo.substring(this.profileForm.value.photo.indexOf(',') + 1);;
          //console.log(this.superAdmin.photo);
          
          this.adminService.updateAdmin(this.admin.id, this.admin).subscribe(
            response => {
              this.handleAdminDetails();
              console.log('Admin updated');
            },
            error => {
              console.log('Error');
            }
          );
        }
      });
    }

    uploadPhoto() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
    
      // Utilisez une fonction fléchée pour capturer correctement la valeur de this.photoFile
      fileInput.addEventListener('change', (event: any) => {
        this.photoFile = event.target.files[0];
        //console.log(this.photoFile); // Vérifiez la valeur de this.photoFile ici
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
        this.currentPhotoUrl = imageData; // Mettez à jour la variable currentPhotoUrl avec la nouvelle image
        this.profileForm.patchValue({ photo: imageData });
      };
    
      reader.readAsDataURL(file);
    }
}
