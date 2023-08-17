import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursDTO } from 'src/app/common/cours-dto';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { ChapitreService } from 'src/app/services/chapitre.service';
import { CoursService } from 'src/app/services/cours.service';
import { AddEditChapitreComponent } from '../add-edit-chapitre/add-edit-chapitre.component';
import { GestionChapitreService } from 'src/app/services/gestion-chapitre.service';
import { ManagerInfo } from 'src/app/common/manager-info';
import { ManagerCoursService } from 'src/app/services/manager-cours.service';
import { AddManagerCoursComponent } from '../add-manager-cours/add-manager-cours.component';

@Component({
  selector: 'app-chapitres',
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.css']
})
export class ChapitresComponent implements OnInit {
  isLoading: boolean = false;
  coursDTO!: CoursDTO;
  managerInfo: ManagerInfo[] = [];

  constructor(
    private coursService: CoursService,
    private chapitreService: ChapitreService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private gestionChapitreService: GestionChapitreService,
    private managerCoursService: ManagerCoursService,
  ) {
  }

  ngOnInit(): void {
    this.getCoursWithChapiter();
  }

  getCoursWithChapiter() {
    const newId = +this.route.snapshot.paramMap.get('id')!;
    this.gestionChapitreService.coursId = newId;
    this.coursService.getCoursWithChapitre(newId).subscribe(
      data => {
        this.coursDTO = data;
        this.getAssignmentManagerCours();
      }
    )
  }

  getAssignmentManagerCours() {
    const newId = +this.route.snapshot.paramMap.get('id')!;
    this.managerCoursService.getAssignmentManagerCours(newId).subscribe(
      data => {
        this.managerInfo = data;
      }
    )
  }

  openConfirmModal(chapitreId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.deleteChapitre(chapitreId);
      }
    });
  }

  deleteChapitre(chapitreId: number) {
    this.isLoading = true;
    this.chapitreService.deleteChapitre(chapitreId, this.coursDTO.cours.id).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading = false;
          console.log("chapitre deleted");
          this.getCoursWithChapiter();
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

  openRemoveManager(managerId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.removeManager(managerId);
      }
    });
  }
  removeManager(managerId: number) {
    this.isLoading = true;
    this.managerCoursService.deleteAssignments(managerId, this.gestionChapitreService.coursId).subscribe(
      data => {
        console.log("Manager removed");
        this.getAssignmentManagerCours();
      }
    )
  }

  openAddChapitreModal(): void {
    const dialogRef = this.dialog.open(AddEditChapitreComponent, {
      width: '540px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCoursWithChapiter();
      }
      else {
        console.log(result);
      }
    });
  }

  openEditChapitreModal(data: any): void {
    const dialogRef =  this.dialog.open(AddEditChapitreComponent, {
      width: '540px',
      data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCoursWithChapiter();
      }
      else {
        console.log(result);
      }
    });
  }

  openAddAssignmentModal(): void {
    const dialogRef = this.dialog.open(AddManagerCoursComponent, {
      width: '540px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAssignmentManagerCours();
      }
      else {

      }
    });
  }

  stratCours(){
    const newId = +this.route.snapshot.paramMap.get('id')!;
    this.router.navigate([`/manager/chapitre/${newId}`]);
  }
  openQuizModal(chapiteId: number){
    this.router.navigate([`/manager/quiz/${chapiteId}`]);
  }

}
