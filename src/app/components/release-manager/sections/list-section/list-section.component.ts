import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { SectionService } from 'src/app/services/section.service';
import { NavigationSectionService } from 'src/app/services/navigation-section.service';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.css'],
})
export class ListSectionComponent implements OnInit {
  section!: any;
  currentId: number | null = null;
  editMode: boolean = false;
  sectionForm!: FormGroup;
  currentChapitre!: any;
  file: any;

  constructor(
    private sectionService: SectionService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private navigationSection: NavigationSectionService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.sectionForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      tempsestimer: [null, Validators.maxLength(500)],
      type: [''],
      file: ['']
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const newId = +this.route.snapshot.paramMap.get('id')!;
        if (this.currentId !== newId) {
          this.currentId = newId;
          window.location.reload();
        } else {
          this.getSection();
        }
      }
      this.getSection();
    });
  }

  getSection() {
    const theId = +this.route.snapshot.paramMap.get('id')!;
    this.navigationSection.sectionId = +theId;
    this.sectionService.getSection(theId).subscribe(
      data => {
        this.section = data;
        this.currentChapitre = this.navigationSection.chapitredto;
        this.patchSectionForm();
      }
    );
  }

  patchSectionForm() {
    if (this.section) {
      this.sectionForm.patchValue({
        titre: this.section.titre,
        description: this.section.description,
        tempsestimer: this.section.tempsestimer,
        type: this.section.type,
        file: this.section.file
      });
    }
  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.deleteSection(id);
      }
    });
  }

  editSection(){
    this.editMode = true;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.file = inputElement.files?.item(0);

    if (this.file) {
      const fileType = this.file.type;
      if (fileType.startsWith('image/')) {
        this.sectionForm.patchValue({ type: 'img' });
      } else if (fileType.startsWith('video/')) {
        this.sectionForm.patchValue({ type: 'video' });
      } else if (fileType === 'application/pdf') {
        this.sectionForm.patchValue({ type: 'pdf' });
      } else {
        // You can handle other file types here
      }
    }
  }
  
  onSubmit() {
    this.uploadFile(this.file);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:8080/upload', formData).subscribe(
      (response) => {
        //console.log('Fichier enregistré dans le répertoire:', response);
        this.sectionForm.patchValue({ file: response.message });
        console.log(this.sectionForm.value);
        this.sectionService.updateSection(this.section.id, this.navigationSection.chapitredto.id, this.sectionForm.value).subscribe(
          response => {
            console.log('Section updated');
          },
          error => {
            console.log('Error');
          });
        /*this.sectionService.updateSection(this.section.id, this.navigationSection.chapitredto.id, this.sectionForm.value).subscribe(
          response => {
            console.log('Section updated');
          },
          error => {
            console.log('Error');
          });*/
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du fichier:', error);
        this.sectionService.updateSection(this.section.id, this.navigationSection.chapitredto.id, this.sectionForm.value).subscribe(
          response => {
            console.log('Section updated');
          },
          error => {
            console.log('Error');
          });
      }
    );
  }

  deleteSection(id: number) {
    const chapitreId = this.navigationSection.chapitredto.id;
    if(chapitreId){
      this.sectionService.deleteSection(id, chapitreId).subscribe(
        data => {
          console.log("section deleted: " + id);
        }
      )
    }
  }
}
