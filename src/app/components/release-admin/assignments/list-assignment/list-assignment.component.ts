import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager } from 'src/app/common/manager';
import { ManagerApprenant } from 'src/app/common/manager-apprenant';
import { AdminService } from 'src/app/services/admin.service';
import { ManagerApprenantService } from 'src/app/services/manager-apprenant.service';
import { AssignmentAddComponent } from '../assignment-add/assignment-add.component';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css']
})
export class ListAssignmentComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns: string[] = ['Manager', 'Apprenants', 'Action'];
  managerApprenant: ManagerApprenant[] = [];
  dataSource!: MatTableDataSource<any>;
  noRecordsFound!: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(
    private adminService: AdminService,
    private managerApprenantService: ManagerApprenantService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleListManager();
      //this.handleListManagerApprenant();
    });
  }

  handleListManager(): void {
    this.managerApprenantService.getAssignmentManagerApprenant(2).subscribe(
      data => {
        this.managerApprenant = data;
        //console.log(this.managerApprenant);
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  deleteAssignment(apprenantId: number, managerId: number): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAssignmentAM(apprenantId, managerId);
      }
    });

  }


  deleteAssignmentAM(apprenantId: number, managerId: number): void {
    this.isLoading = true;
    this.managerApprenantService.deleteAssignments(apprenantId, managerId).subscribe({
      next: (res) => {
        this.handleListManager();
        setTimeout(() => {
          this.isLoading = false;
          console.log('assignment deleted');
        }, 1000);

      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading = false;
          console.log('errur');
        }, 1000);
      },
    })
  }
  openAddAssignmentModal(data: any): void {
    const dialogRef = this.dialog.open(AssignmentAddComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleListManager();
      }
    });
  }
  /*
  

  

   handleListManagerApprenant(): void {
     this.managers.forEach((element: Manager) => {
       this.managerApprenantService.getAssignmentManagerApprenant(element.id).subscribe(
         data => {
           this.managerApprenant.push(data);
         }
       )
     });
   }*/

}
