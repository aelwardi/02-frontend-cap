import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AdminAddEditComponent } from '../admin-add-edit/admin-add-edit.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'details', 'action'];
  admins: Admin[] = [];
  searchMode: boolean = false;
  dataSource!: MatTableDataSource<any>;
  noRecordsFound!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(private adminService: AdminService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listAdmin();
    });
  }

  listAdmin() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchAdmin();
    }
    else {
      this.handleListAdmin();
    }
  }

  handleSearchAdmin() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    // now search for the departements using keyword
    this.adminService.searchAdmin(theKeyword).subscribe(
      data => {
        this.admins = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  handleListAdmin() {
    this.adminService.getAdminList().subscribe(
      data => {
        this.admins = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openEditAdminModal(data: any): void {
    const dialogRef = this.dialog.open(AdminAddEditComponent, {
      width: '540px',
      data,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleListAdmin();
      }
      else {
        console.log(result);
      }
    });
  }

  openAddAdminModal(): void {

    const dialogRef = this.dialog.open(AdminAddEditComponent, {
      width: '540px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleListAdmin();
      }
      else {
        console.log(result);
      }
    });
  }

  redirectToDetails(id: number) {
    this.router.navigate(['super-admin/admins/details', id]);
  }
}
