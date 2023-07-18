import { Component, Input, OnInit } from '@angular/core';
import { ManagerComponent } from '../../template/manager/manager.component';
import { MatDrawer } from '@angular/material/sidenav';
import { ProjetService } from 'src/app/services/projet.service';
import { DepartementService } from 'src/app/services/departement.service';
import { Projet } from 'src/app/common/projet';
import { cours } from 'src/app/common/cours';
import { CoursService } from 'src/app/services/cours.service';
import { AddEditCoursComponent } from '../add-edit-cours/add-edit-cours.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { ManagerService } from 'src/app/services/manager.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  cours: cours[] = [];
  projects: Projet[] = [];
  noRecordsFound!: boolean;
  projectId!: any;
  searchMode: boolean = false;
  projets: string[] = [];
  depId?: any;
  route: any;
  idProject?: any;
  nameProject: string | undefined = "Name of project";

  dialogRefSubscription: Subscription | undefined;




  constructor(private projetService: ProjetService,
    private departementService: DepartementService,
    private coursService: CoursService,
    private dialog: MatDialog,
    private managerService: ManagerService,
    private routee: ActivatedRoute
  ) { }

  ngOnInit() {

    this.listProjet();
    this.routee.params.subscribe(params => {
      this.idProject = params['idProject'];
      console.log("##ng on init", this.idProject)
      this.getCoursesByProject(this.idProject);

      this.coursService.getProjectById(this.idProject).subscribe(
        result => {
          this.nameProject = result.name
        }
      )
      //this.nameProject = idProject;
    })
    this.handleSearchCours();


  }

  getNameProject(idProject: number): string {

    return "test"
  }

  ngOnDestroy() {
    this.unsubscribeDialogRef()
  }
  listProjet() {
    if (!this.depId) {
      this.managerService.getManager(1).subscribe(
        data => {
          this.depId = +data.departement!.id;
          this.loadProjectsByDepartement();

        }
      );
    } else {
      this.loadProjectsByDepartement();
    }
  }


  loadProjectsByDepartement() {
    this.departementService.getProjetsByDepartement(this.depId).subscribe(
      (projects: any[]) => {
        this.projects = projects;
        console.log(projects)
      },
      (error) => {
        console.log('Error retrieving projects:', error);
      }
    );
  }

  // constructor(private manaManagerComponentger: ManagerComponent) {
  //   this.manaManagerComponentger.showHeader = false;
  // }

  @Input()
  deviceXs!: boolean;
  topVal = 0;
  onScroll(e: any) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }
  // Define the drawer property
  drawer: MatDrawer | undefined;

  getCoursesByProject(id: number) {


    this.coursService.getCoursesByProject(id)
      .subscribe((cours: cours[]) => {
        this.cours = cours;
        //console.log("##cours :" + JSON.stringify(cours));
      });
  }

  openAddCoursModal(): void {
    const dialogRef = this.dialog.open(AddEditCoursComponent, {
      width: '540px',
      data: { idpr: this.idProject }
    });
    this.dialogRefSubscription = dialogRef.afterClosed().subscribe((result: any) => {
      this.getCoursesByProject(this.idProject);
    });
  }

  unsubscribeDialogRef(): void {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }
  openEditCoursModal(dataUpdated: any): void {
    const dialogRef = this.dialog.open(AddEditCoursComponent, {
      width: '540px',
      data: { dataUpdated: dataUpdated },
    });
    this.dialogRefSubscription = dialogRef.afterClosed().subscribe((result: any) => {
      this.getCoursesByProject(this.idProject);
    });

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
    this.coursService.deleteCours(id).subscribe({
      next: (res) => {
        this.getCoursesByProject(this.idProject);
      },
      error: () => { console.log("ttttt") },
    })
  }
  handleSearchCours() {
    const theKeyword: string = this.routee.snapshot?.paramMap.get('keyword')!;
    console.log("keyword", theKeyword)

    if (this.coursService) {
      this.coursService.searchCours(theKeyword).subscribe(
        data => {
          this.cours = data;
          console.log("#cours", this.cours)
          //this.projects = data.slice(0, 3);
          //this.initializePaginator();
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }



}
