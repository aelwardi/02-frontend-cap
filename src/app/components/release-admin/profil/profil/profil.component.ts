import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  isLoading: boolean = false;
  profileForm!: FormGroup;
  admin!: Admin;
  photoFile: File | undefined;
  currentPhotoUrl: string | undefined;
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
    private adminService: AdminService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
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

    this.adminService.getAdminDetails(theAdminId).subscribe(
      data => {
        this.admin = data;
        this.profileForm.patchValue(this.admin);
        //console.log(this.admin);
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
        this.admin.dateBirth = this.profileForm.value.dateBirth;
        this.admin.phone = this.profileForm.value.phone;
        this.admin.sexe = this.profileForm.value.sexe;
        this.admin.photo = this.profileForm.value.photo.substring(this.profileForm.value.photo.indexOf(',') + 1);;
        //console.log(this.superAdmin.photo);
        this.adminService.updateProfile(this.admin.id, this.admin).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              this.handleAdminDetails();
              console.log('Admin updated');
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
      else {
        setTimeout(() => {
          this.isLoading = false;
          console.log('Error');
        }, 1000);
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
