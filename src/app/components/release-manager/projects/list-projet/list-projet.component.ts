import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/common/projet';
import { DepartementService } from 'src/app/services/departement.service';
import { ManagerService } from 'src/app/services/manager.service';
import { ProjetService } from 'src/app/services/projet.service';
import { AddEditProjectComponent } from '../add-edit-project/add-edit-project.component';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css']
})
export class ListProjetComponent implements OnInit {
  isLoading: boolean = false;
  projets: Projet[] = [];
  projects: Projet[] = [];
  noRecordsFound!: boolean;
  searchMode: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private managerService: ManagerService,
    private departementService: DepartementService,
    private projetService: ProjetService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProjet();
    });
  }

  redirectToProject(projetId: number) {
    this.router.navigate([`/manager/projects/${projetId}`]);
  }

  listProjet() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProject();
    }
    else {
      this.handleListProject();
    }
  }

  handleSearchProject() {
    const managerId = 2;
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.projetService.searchProjects(theKeyword, managerId).subscribe(
      data => {
        this.projets = data;
        this.projects = data.slice(0, 3);
        this.initializePaginator();
      },
      error => {
        console.log(error);
      }
    )
  }

  handleListProject() {
    const managerId = 2;
    this.projetService.getProjetsByDepartement(managerId).subscribe(
      data => {
        //console.log(data);
        this.projets = data;
        this.projects = data.slice(0, 3);
        this.initializePaginator(); // Appel de la méthode ici
      }
    )
  }

  initializePaginator() {
    this.paginator.pageSize = 3; // Nombre d'éléments par page
    this.paginator.pageIndex = 0; // Page actuelle (commence à 0)
    this.paginator.length = this.projets.length; // Nombre total d'éléments

    this.paginator.page.subscribe(() => {
      // Lorsque l'utilisateur change de page
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.projects = this.projets.slice(startIndex, endIndex);
    });
  }

  openEditProjectModal(data: any): void {
    const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '540px',
      data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleListProject();
      }
      else {
        console.log(result);
      }
    });
  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.deleteProject(id);
      }
    });
  }

  deleteProject(id: number): void {
    this.isLoading = true;
    this.projetService.deleteProject(id).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading = false;
          this.listProjet();
        }, 1000);
      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    })
  }

  openAddProjectModal(): void {

    const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '540px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleListProject();
      }
      else {
        console.log(result);
      }
    });
  }
}
