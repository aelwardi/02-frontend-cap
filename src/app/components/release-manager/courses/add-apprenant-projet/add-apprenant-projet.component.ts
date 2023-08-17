import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManagerInfo } from 'src/app/common/manager-info';
import { ApprenantProjetService } from 'src/app/services/apprenant-projet.service';
import { SharedProjetService } from 'src/app/services/shared-projet.service';
import { AddManagerCoursComponent } from '../../chapitre/add-manager-cours/add-manager-cours.component';

@Component({
  selector: 'app-add-apprenant-projet',
  templateUrl: './add-apprenant-projet.component.html',
  styleUrls: ['./add-apprenant-projet.component.css']
})
export class AddApprenantProjetComponent implements OnInit {
  apprenantInfo: ManagerInfo[] = [];
  assignmentForm!: FormGroup;

  constructor(
    private sharedProjetService: SharedProjetService,
    private apprenantProjetService: ApprenantProjetService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddManagerCoursComponent> 
  ){
    this.assignmentForm = this._formBuilder.group({
      apprenant: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getApprenantsByManagerAndNotInProject();
  }

  getApprenantsByManagerAndNotInProject() {
    this.apprenantProjetService.getApprenantsByManagerAndNotInProject(2, this.sharedProjetService.projetId).subscribe(
      data => {
        this.apprenantInfo = data;
        //console.log(this.apprenantInfo);
      }
    )
  }

  onFormSubmit(): void{
    if(this.assignmentForm.valid){
      this.apprenantProjetService.addApprenantProjet(this.assignmentForm.value.apprenant.id, this.sharedProjetService.projetId).subscribe(
        data => {
          console.log("manager assigned");
          this.dialogRef.close(true);
        }
      )
    }
  }

}
