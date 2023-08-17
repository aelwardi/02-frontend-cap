import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
    this.isMobile = window.innerWidth < 768; // Modifier la valeur de 768 selon votre besoin
  }

  constructor(
    private dialog: MatDialog,
    private managerService: ManagerService,
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
      if (result) {
        // call method update
        this.manager.dateBirth = this.profileForm.value.dateBirth;
        this.manager.phone = this.profileForm.value.phone;
        this.manager.sexe = this.profileForm.value.sexe;
        this.manager.photo = this.profileForm.value.photo.substring(this.profileForm.value.photo.indexOf(',') + 1);;
        //console.log(this.superAdmin.photo);
        /*
        this.managerService.updateManager(this.manager.id, this.manager).subscribe(
          response => {
            this.handleManagerDetails();
            console.log('Manager updated');
          },
          error => {
            console.log('Error');
          }
        );*/
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
