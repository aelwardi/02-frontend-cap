import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager } from 'src/app/common/manager';
import { ManagerService } from 'src/app/services/manager.service';
import { ManagerAddEditComponent } from '../manager-add-edit/manager-add-edit.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'details' , 'action'];
  managers: Manager[] = [];
  searchMode: boolean = false;
  dataSource!: MatTableDataSource<any>;
  noRecordsFound!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(
    private managerService: ManagerService,
    private adminService: AdminService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listManager();
    });
  }

  listManager() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchManager();
    }
    else {
      this.handleListManager();
    }
  }

  handleListManager() {
    this.adminService.getManagerList(2).subscribe(
      data => {
        this.managers = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  handleSearchManager() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    // now search for the departements using keyword
    this.managerService.searchManager(2, theKeyword).subscribe(
      data => {
        this.managers = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openEditManagerModal(data: any): void {
    this.dialog.open(ManagerAddEditComponent, {
      width: '540px',
      data,
    });
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/admin/managers/details', id]);
  }
}
