import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-add-edit-section',
  templateUrl: './add-edit-section.component.html',
  styleUrls: ['./add-edit-section.component.css']
})
export class AddEditSectionComponent implements OnInit {
  isLoading: boolean = false;
  sectionForm!: FormGroup;
  file: any;

  constructor(
    public dialogRef: MatDialogRef<AddEditSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sectionService: SectionService
  ) {
    this.sectionForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      tempsestimer: [null, Validators.maxLength(500)],
      type: [''],
      file: ['']
    });
  }

  ngOnInit() {
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
        //console.log('Fichier enregistré dans le répertoire:', response);
        this.sectionForm.patchValue({ file: response.message });
        //console.log(this.sectionForm.value);
        this.sectionService.addSection(this.data.id, this.sectionForm.value).subscribe(
          response => {
            setTimeout(() => {
              this.isLoading = false;
              console.log('Section added')
            this.dialogRef.close(true);
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
        setTimeout(() => {
          this.isLoading = false;
          console.error('Erreur lors de l\'envoi du fichier:', error);
        }, 1000);
      }
    );
  }

  

}
