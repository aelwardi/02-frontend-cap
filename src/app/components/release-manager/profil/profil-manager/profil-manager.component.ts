import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Manager } from 'src/app/common/manager';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-profil-manager',
  templateUrl: './profil-manager.component.html',
  styleUrls: ['./profil-manager.component.css']
})
export class ProfilManagerComponent implements OnInit {
  isLoading: boolean = false;
  profileForm!: FormGroup;
  manager!: Manager;
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
    private managerService: ManagerService,
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

    this.checkScreenSize();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleManagerDetails();
    })
  }

  handleManagerDetails() {
    const theManagerId: number = +1;

    this.managerService.getManager(theManagerId).subscribe(
      data => {
        this.manager = data;
        this.profileForm.patchValue(this.manager);
        console.log(this.manager);
      }
    );
  }

  onFormSubmit(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      if (result) {
        // call method update
        this.manager.dateBirth = this.profileForm.value.dateBirth;
        this.manager.phone = this.profileForm.value.phone;
        this.manager.sexe = this.profileForm.value.sexe;
        this.manager.photo = this.profileForm.value.photo.substring(this.profileForm.value.photo.indexOf(',') + 1);;
        //console.log(this.superAdmin.photo);

        this.managerService.updateProfile(this.manager.id, this.manager).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              this.handleManagerDetails();
              console.log('Manager updated');
              this._snackBar.open('Manager updated successfully.', '', {
                duration: 3000,
                panelClass: ['green-snackbar'],
              });
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
              this._snackBar.open('Manager update unsuccessful.', '', {
                duration: 3000,
                panelClass: ['red-snackbar'],
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
      this.profileForm.patchValue({ photo: imageData });
    };

    reader.readAsDataURL(file);
  }
}
