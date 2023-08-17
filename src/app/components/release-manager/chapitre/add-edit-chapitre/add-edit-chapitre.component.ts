import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChapitreService } from 'src/app/services/chapitre.service';
import { GestionChapitreService } from 'src/app/services/gestion-chapitre.service';

@Component({
  selector: 'app-add-edit-chapitre',
  templateUrl: './add-edit-chapitre.component.html',
  styleUrls: ['./add-edit-chapitre.component.css']
})
export class AddEditChapitreComponent {
  isLoading: boolean = false;
  chapitreForm!: FormGroup;
  chapitre!: any;

  constructor(
    public dialogRef: MatDialogRef<AddEditChapitreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chapitreService: ChapitreService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private gestionChapitreService: GestionChapitreService
  ) {
    this.chapitreForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
    });
  }

  ngOnInit(): void {
    this.fetchForm();
  }

  fetchForm(): void {
    this.chapitreForm.patchValue(this.data);
  }

  onFormSubmit():void {
    this.isLoading = true;
    if(this.data){
      this.chapitreService.updateChapitre(this.data.id, this.chapitreForm.value).subscribe(
        {
          next: (res) => {
            setTimeout(() => {
              this.isLoading = false;
              console.log("Chapitre updated!");
              this.dialogRef.close(true);
            }, 1000);
          },
          error: () => { 
            setTimeout(() => {
              this.isLoading = false;
              console.log("erreur");
            }, 1000);
           },
        }
      )
    }else {
      this.chapitreService.addChapitreToCours(this.gestionChapitreService.coursId, this.chapitreForm.value).subscribe(
        {
          next: (res) => {
            setTimeout(() => {
              this.isLoading = false;
              console.log("Chapitre added!");
              this.dialogRef.close(true);
            }, 1000);
          },
          error: () => { 
            setTimeout(() => {
              this.isLoading = false;
              console.log("erreur");
            }, 1000);
           },
        }
      )
    }
  }
}
