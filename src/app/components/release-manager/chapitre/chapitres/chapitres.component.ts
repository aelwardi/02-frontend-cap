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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedChapitreService } from 'src/app/services/shared-chapitre.service';
import { SupportCoursService } from 'src/app/services/support-cours.service';
import { AddSeeSupportCoursComponent } from '../../supportCours/add-see-support-cours/add-see-support-cours.component';

@Component({
  selector: 'app-chapitres',
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.css']
})
export class ChapitresComponent implements OnInit {
  isLoading: boolean = false;
  coursDTO!: CoursDTO;
  managerInfo: ManagerInfo[] = [];
  chapitreId?: number;
  supportCour: any;

  constructor(
    private coursService: CoursService,
    private chapitreService: ChapitreService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private gestionChapitreService: GestionChapitreService,
    private managerCoursService: ManagerCoursService,
    private _snackBar: MatSnackBar,
    private sharedChapitreService: SharedChapitreService,
    private supportCourService: SupportCoursService
  ) {
  }

  ngOnInit(): void {
    this.getCoursWithChapiter();
    this.route.params.subscribe(params => {
      this.chapitreId = +params['id'];
      if (!isNaN(this.chapitreId)) {
        console.log("id ==>", this.chapitreId)
        this.supportCourseExist(this.chapitreId)

      } else {
        console.log("there is no chapitre id")
      }
    });

    console.log("support =>", this.supportCour.idChapitre)
  }
  supportCourseExist(idChapitre: number) {
    this.supportCourService.getChapitreWithSection(idChapitre).subscribe(
      data => {
        console.log(data)
        this.supportCour = data;
      },
      error => {
        console.log(error)
      }
    )
  }
  checkSupport(id: number) {
    console.log("check id:", id);
    this.supportCourseExist(id);

  }

  openAddSupportModal(id: number): void {
    const idC: number = 0;

    const dialogRef = this.dialog.open(AddSeeSupportCoursComponent, {
      width: '600px',

      data: this.supportCour ? { support: this.supportCour } : { idChapitre: id }
    });
    console.log("data==>", this.chapitreId)
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
      }
      else {
        //console.log("ddd",result);
      }
    });
    console.log("i'm here")
    console.log(id)
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
          this._snackBar.open('Chapter deleted successfully.', '', {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });
        }, 1000);
      },
      error: () => {
        setTimeout(() => {
          this.isLoading = false;
          console.log("erreur");
          this._snackBar.open('Not deleted Chapter.', '', {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
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
      response => {
        setTimeout(() => {
          this.isLoading = false;
          console.log("Manager removed");
          this.getAssignmentManagerCours();
          this._snackBar.open('Manager removed successfully.', '', {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });
        }, 1000);
      },
      error => {
        setTimeout(() => {
          this.isLoading = false;
          console.log(error);
          this._snackBar.open('Manager removal unsuccessful.', '', {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        }, 1000);

      });
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
    const dialogRef = this.dialog.open(AddEditChapitreComponent, {
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

  stratCours() {
    if (this.coursDTO.chapitres.length > 0) {
      const newId = +this.route.snapshot.paramMap.get('id')!;
      this.router.navigate([`/manager/chapitre/${newId}`]);
    } else {
      this._snackBar.open('You will need to first create at least one chapter.', '', {
        duration: 3000,
      });
    }
  }
  openQuizModal(chapiteId: number, nameChapter: string) {
    this.sharedChapitreService.chapterName = nameChapter;
    this.router.navigate([`/manager/quiz/${chapiteId}`]);
  }

}
