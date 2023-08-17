import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { CoursService } from 'src/app/services/cours.service';
import { ProjetService } from 'src/app/services/projet.service';
import { AddEditCoursComponent } from '../add-edit-cours/add-edit-cours.component';
import { Subscription } from 'rxjs';
import { SharedProjetService } from 'src/app/services/shared-projet.service';
import { ApprenantInfo } from 'src/app/common/apprenant-info';
import { ApprenantProjetService } from 'src/app/services/apprenant-projet.service';
import { AddApprenantProjetComponent } from '../add-apprenant-projet/add-apprenant-projet.component';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  isLoading: boolean = false;
  isSidebarActive = false;
  projetCours!: any;
  currentProjetCourses!: any;
  dialogRefSubscription: Subscription | undefined;
  apprenantInfo: ApprenantInfo[] = [];

  constructor(
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private coursService: CoursService,
    private sharedProjetService: SharedProjetService,
    private apprenantProjetService: ApprenantProjetService,
  ) { }

  ngOnInit(): void {
    this.getProjetsAndCours();
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  getProjetsAndCours() {
    const managerId = +2;
    this.projetService.getProjetsAndCoursByManagerId(managerId).subscribe(
      data => {
        this.projetCours = data;
        const projetId = +this.route.snapshot.paramMap.get('id')!;
        this.sharedProjetService.projetId = projetId;
        this.getCurrentProjetsCours(projetId);
      }
    )
  }

  getCurrentProjetsCours(projetId: number) {
    this.currentProjetCourses = this.projetCours.find((projet: any) => projet.projetInfo.id === projetId);
    this.getAssignmentApprenantProjet();
    //console.log(this.currentProjetCourses);
  }

  getAssignmentApprenantProjet() {
    const newId = +this.route.snapshot.paramMap.get('id')!;
    this.apprenantProjetService.getAssignmentApprenantProjet(newId).subscribe(
      data => {
        this.apprenantInfo = data;
        //console.log(this.apprenantInfo);
      }
    )
  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.deleteCours(id);
      }
    });
  }

  deleteCours(id: number): void {
    this.isLoading = true;
    this.coursService.deleteCours(id).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading = false;
          this.getProjetsAndCours();
        }, 1000);
      },
      error: () => { 
        setTimeout(() => {
          this.isLoading = false;
          console.log("erreur");
        }, 1000);
       },
    })
  }

  openAddCoursModal(): void {
    const dialogRef = this.dialog.open(AddEditCoursComponent, {
      width: '540px',
      data: { idpr: this.currentProjetCourses.projetInfo.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProjetsAndCours();
      }
      else {
        
      }
    });
  }

  openEditCoursModal(dataUpdated: any): void {
    const dialogRef = this.dialog.open(AddEditCoursComponent, {
      width: '540px',
      data: { dataUpdated: dataUpdated },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProjetsAndCours();
      }
      else {
        
      }
    });

  }

  openAddAssignmentModal(): void {
    const dialogRef = this.dialog.open(AddApprenantProjetComponent, {
      width: '540px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAssignmentApprenantProjet();
      }
      else {
        
      }
    });
  }

  openRemoveApprenant(apprenantId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.removeApprenant(apprenantId);
      }
    });
  }

  removeApprenant(apprenantId: number) {
    this.apprenantProjetService.deleteApprenantProjet(apprenantId, this.sharedProjetService.projetId).subscribe(
      data => {
        console.log("Apprenant removed");
        this.getAssignmentApprenantProjet();
      }
    )
  }
}
