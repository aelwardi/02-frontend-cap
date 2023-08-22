import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SuperAdmin } from 'src/app/common/super-admin';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { ConfirmDialogComponent } from '../../departement/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  profileForm!: FormGroup;
  superAdmin!: SuperAdmin;
  photoFile!: File | null;
  currentPhotoUrl!: string | null;
  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; 
  }

  constructor(
    private dialog: MatDialog,
    private superAdminService: SuperAdminService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      sexe: ['', Validators.required],
      email: ['', Validators.required],
      etat: ['', Validators.required],
      photo: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleSuperAdminDetails();
    })
  }

  handleSuperAdminDetails() {

    const theSuperAdminId: number = +1;

    this.superAdminService.getSuperAdmin(theSuperAdminId).subscribe(
      data => {
        this.superAdmin = data;
        this.profileForm.patchValue(this.superAdmin);
      }
    );
  }

  onFormSubmit(): void {
    this.isLoading = true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method update
        this.superAdmin.dateOfBirth = this.profileForm.value.dateOfBirth;
        this.superAdmin.phone = this.profileForm.value.phone;
        this.superAdmin.sexe = this.profileForm.value.sexe;
        this.superAdmin.photo = this.profileForm.value.photo.substring(this.profileForm.value.photo.indexOf(',') + 1);
        this.superAdminService.updateSuperAdmin(this.superAdmin.id, this.superAdmin).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              this.handleSuperAdminDetails();
              console.log('Super Admin updated');
              this._snackBar.open('Profile updated successfully.', '', {
                duration: 2000,
                panelClass: ['green-snackbar'],
              });
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
              this._snackBar.open('Profile update unsuccessful.', '', {
                duration: 2000,
                panelClass: ['green-snackbar'],
              });
            }, 1000);
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
