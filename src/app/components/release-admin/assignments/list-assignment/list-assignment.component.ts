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

  displayedColumns: string[] = ['Manager', 'Apprenants', 'Action'];
  managers: Manager[] = [];
  datas: any;
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
    this.adminService.getManagerList(2).subscribe(
      data => {
        data.forEach((element: Manager) => {
          //console.log(element);
          this.managerApprenantService.getAssignmentManagerApprenant(element.id).subscribe(
            data => {
              //console.log(data.manager);
              this.datas=data;
              this.managerApprenant.push(data);
              this.dataSource = new MatTableDataSource<any>(this.managerApprenant);
              this.noRecordsFound = this.dataSource.data.length === 0;
              this.dataSource.paginator = this.paginator;
            }
          )
        })
      }
    )
  }
  
  openAddAssignmentModal(data: any): void {
    this.dialog.open(AssignmentAddComponent, {
      data,
    });
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
    this.managerApprenantService.deleteAssignments(apprenantId, managerId).subscribe({
      next: (res) => {
        console.log('assignment deleted');
      },
      error: console.log,
    })
  }

  /* handleListManagerApprenant(): void {
     this.managers.forEach((element: Manager) => {
       this.managerApprenantService.getAssignmentManagerApprenant(element.id).subscribe(
         data => {
           this.managerApprenant.push(data);
         }
       )
     });
   }*/

}
