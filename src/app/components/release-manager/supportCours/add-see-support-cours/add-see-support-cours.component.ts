import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportCoursService } from 'src/app/services/support-cours.service';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { supportCours } from 'src/app/common/support-cours';


@Component({
  selector: 'app-add-see-support-cours',
  templateUrl: './add-see-support-cours.component.html',
  styleUrls: ['./add-see-support-cours.component.css']
})
export class AddSeeSupportCoursComponent implements OnInit {
  photoFile: File | undefined;
  currentPdfUrl: string | undefined;
  supportCoursForm!: FormGroup;
  department!: any;
  panelOpenState = false;
  chapitreId?: number;
  idSupportCours: any;
  supportCour: any[] = [];
  @ViewChild('pdfInput') pdfInput: any;


  constructor(
    public dialogRef: MatDialogRef<AddSeeSupportCoursComponent>,
    // @ViewChild('pdfInput') pdfInput: ElementRef<HTMLInputElement>;
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private supportCoursService: SupportCoursService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
    this.supportCoursForm = this.formBuilder.group({
      title: ['', Validators.required],
      file: null,
      chapitreId: ['']
    });

  }


  onFormSubmit() {
    const formData = new FormData();
    formData.append('title', this.supportCoursForm.value.title);
    formData.append('chapitreId', this.data.idChapitre.toString()); // Convert chapitreId to a string

    const selectedFile = this.pdfInput.nativeElement.files[0]; // Get the selected file
    if (selectedFile) {
      formData.append('file', selectedFile, selectedFile.name);
    } else {
      console.log('No PDF file selected.');
      return; // Exit the function if no file is selected
    }

    this.supportCoursService.saveSupport(
      formData.get('chapitreId'),
      formData.get('file'),
      formData.get('title')
    ).subscribe(
      (response) => {
        console.log('Upload successful', response);
        this.dialogRef.close(); // Close the dialog on success
      },
      (error) => {
        console.error('Upload failed', error);
      }
    );
  }


  getFileName(path: string): string {
    if (path) {
      const pathSegments = path.split("\\");
      const fileName = pathSegments.pop();

      if (fileName) {
        return fileName;
      }
    }

    return "";
  }


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    console.log("data of popup", this.data)
    //console.log("rest file : " , this.getFileName(this.data.support.pathFile))
    console.log("forms : ", this.supportCoursForm)

  }
  getSupportCoursById(id: number) {
    this.supportCoursService.getSupportCoursById(id)
      .subscribe((supportCour: supportCours[]) => {
        this.supportCour = supportCour;
        //console.log("##cours :" + JSON.stringify(cours));
      });
  }
  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.deleteSupportCoursById(id);
      }
    });
  }

  deleteSupportCoursById(id: number): void {
    this.supportCoursService.deleteSupportCoursById(id).subscribe(
      () => {
        console.log(`Support course with ID ${id} has been deleted successfully.`);
        // Reload the current route to refresh the page
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting support course:', error);
        // Handle error cases
      }
    );
  }




}
