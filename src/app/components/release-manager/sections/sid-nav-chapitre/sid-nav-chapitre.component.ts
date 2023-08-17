import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChapitreDTO } from 'src/app/common/chapitre-dto';
import { SectionService } from 'src/app/services/section.service';
import { NavigationSectionService } from 'src/app/services/navigation-section.service';
import { AddEditSectionComponent } from '../add-edit-section/add-edit-section.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sid-nav-chapitre',
  templateUrl: './sid-nav-chapitre.component.html',
  styleUrls: ['./sid-nav-chapitre.component.css'],
})
export class SidNavChapitreComponent implements OnInit {
  isLoading: boolean = false;
  panelOpenState = false;
  chapitreDTO: ChapitreDTO[] = [];
  isSidebarActive = false;
  showSections = false;
  chapitredtoCurrent: any;
  sectionCurrent: any;
  sectionForm!: FormGroup;
  editMode: boolean = false;
  file: any;


  constructor(
    private sectionService: SectionService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private navigationSection: NavigationSectionService,
    private formBuilder: FormBuilder,
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
    this.route.paramMap.subscribe(() => {
      this.listChapitre();
    });
  }

  listChapitre() {
    const cousId = +this.route.snapshot.paramMap.get('id')!;
    this.sectionService.getChapitreWithSection(cousId).subscribe(
      data => {
        this.chapitreDTO = data;
        if (!this.chapitredtoCurrent && this.chapitreDTO.length > 0) {
          this.chapitredtoCurrent = this.chapitreDTO[0];
        }

        if (this.chapitredtoCurrent && !this.sectionCurrent && this.chapitredtoCurrent.sections.length > 0) {
          this.sectionCurrent = this.chapitredtoCurrent.sections[0];
        }
        if (this.sectionCurrent && this.chapitreDTO.length > 0) {
          const sectionId = this.sectionCurrent.id;
          const chapitreContainingSection = this.chapitreDTO.find(chapitre =>
            chapitre.sections.some(section => section.id === sectionId)
          );

          if (chapitreContainingSection) {
            const section = chapitreContainingSection.sections.find(section => section.id === sectionId);
            if (section) {
              this.sectionCurrent = section;
              this.chapitredtoCurrent = chapitreContainingSection;
            }
          }
        }
      }
    )
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  addSection(data: any): void {
    const dialogRef = this.dialog.open(AddEditSectionComponent, {
      width: '550px',
      data,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listChapitre();
      }
      else {
        console.log(result);
      }
    });
  }

  editSection() {
    console.log("ok");
    if (this.sectionCurrent) {
      this.sectionForm.patchValue({
        titre: this.sectionCurrent.titre,
        description: this.sectionCurrent.description,
        tempsestimer: this.sectionCurrent.tempsestimer,
        type: this.sectionCurrent.type,
        file: this.sectionCurrent.file
      });
      this.editMode = true;
    }
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
    this.isLoading = true;
    this.uploadFile(this.file);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:8080/upload', formData).subscribe(
      (response) => {
        this.sectionForm.patchValue({ file: response.message });
        //console.log(this.sectionForm.value);
        this.sectionService.updateSection(this.sectionCurrent.id, this.chapitredtoCurrent.chapitre.id, this.sectionForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              this.editMode = false;
              this.listChapitre();
              console.log('Section updated');
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
            }, 1000);
          });
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du fichier:', error);
        this.sectionService.updateSection(this.sectionCurrent.id, this.chapitredtoCurrent.chapitre.id, this.sectionForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              this.editMode = false;
              this.listChapitre();
              console.log('Section updated');
            }, 1000);
          },
          error => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Error');
            }, 1000);
          });
      }
    );
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
  deleteSection(id: number) {
    this.isLoading = true;
    if (this.chapitredtoCurrent.chapitre) {
      const currentSectionIndex = this.chapitredtoCurrent.sections.indexOf(this.sectionCurrent);
      if (this.chapitredtoCurrent.sections.length > 2) {
        if (currentSectionIndex >= 0) {
          if (currentSectionIndex < this.chapitredtoCurrent.sections.length - 1) {
            this.sectionCurrent = this.chapitredtoCurrent.sections[currentSectionIndex + 1];
          } else {
            this.sectionCurrent = this.chapitredtoCurrent.sections[currentSectionIndex - 1];
          }
        }
      } else {
        this.sectionCurrent = null;
      }
      //console.log(id + " " + this.chapitredtoCurrent.chapitre.id)
      this.sectionService.deleteSection(id, this.chapitredtoCurrent.chapitre.id).subscribe(
        {
          next: (res) => {
            setTimeout(() => {
              this.isLoading = false;
              console.log("section deleted: " + id);
              this.listChapitre();
            }, 1000);
          },
          error: (err) => {
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          }
        }
      )
    }
  }
  // Pour la nivigation
  getSectionCurrent(theSection: any) {
    this.sectionCurrent = theSection;
    if (this.sectionCurrent && this.chapitreDTO.length > 0) {
      const chapitreContainingSection = this.chapitreDTO.find(chapitre =>
        chapitre.sections.includes(this.sectionCurrent)
      );

      if (chapitreContainingSection) {
        this.chapitredtoCurrent = chapitreContainingSection;
      }
    }
  }
  next() {
    const currentSectionIndex = this.chapitredtoCurrent.sections.indexOf(this.sectionCurrent);
    const currentChapitreIndex = this.chapitreDTO.indexOf(this.chapitredtoCurrent);

    if (currentChapitreIndex === this.chapitreDTO.length - 1) {
      // We're at the last chapitre, navigate to the next section within the same chapitre
      this.navigateToNextSectionInSameChapitre();
    } else if (currentSectionIndex < this.chapitredtoCurrent.sections.length - 1) {
      // Navigate to the next section within the same chapitre
      this.navigateToNextSectionInSameChapitre();
    } else {
      // Navigate to the first section of the next chapitre
      this.navigateToFirstSectionInNextChapitre();
    }
  }
  navigateToNextSectionInSameChapitre() {
    const currentSectionIndex = this.chapitredtoCurrent.sections.indexOf(this.sectionCurrent);
    if (currentSectionIndex < this.chapitredtoCurrent.sections.length - 1) {
      this.sectionCurrent = this.chapitredtoCurrent.sections[currentSectionIndex + 1];
    }
  }


  navigateToFirstSectionInNextChapitre() {
    const currentChapitreIndex = this.chapitreDTO.indexOf(this.chapitredtoCurrent);
    if (currentChapitreIndex < this.chapitreDTO.length - 1) {
      this.chapitredtoCurrent = this.chapitreDTO[currentChapitreIndex + 1];
      this.sectionCurrent = this.chapitredtoCurrent.sections[0];
    }
  }
  prev() {
    const currentSectionIndex = this.chapitredtoCurrent.sections.indexOf(this.sectionCurrent);
    const currentChapitreIndex = this.chapitreDTO.indexOf(this.chapitredtoCurrent);

    if (currentChapitreIndex === 0) {
      // We're at the first chapitre, navigate to the previous section within the same chapitre
      this.navigateToPreviousSectionInSameChapitre();
    } else if (currentSectionIndex > 0) {
      // Navigate to the previous section within the same chapitre
      this.navigateToPreviousSectionInSameChapitre();
    } else {
      // Navigate to the last section of the previous chapitre
      this.navigateToLastSectionInPreviousChapitre();
    }
  }
  navigateToPreviousSectionInSameChapitre() {
    const currentSectionIndex = this.chapitredtoCurrent.sections.indexOf(this.sectionCurrent);
    if (currentSectionIndex > 0) {
      this.sectionCurrent = this.chapitredtoCurrent.sections[currentSectionIndex - 1];
    }
  }

  navigateToLastSectionInPreviousChapitre() {
    const currentChapitreIndex = this.chapitreDTO.indexOf(this.chapitredtoCurrent);
    if (currentChapitreIndex > 0) {
      this.chapitredtoCurrent = this.chapitreDTO[currentChapitreIndex - 1];
      const sectionsCount = this.chapitredtoCurrent.sections.length;
      this.sectionCurrent = this.chapitredtoCurrent.sections[sectionsCount - 1];
    }
  }
  cancel() {
    this.editMode = false;
  }
}
