import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Apprenant } from 'src/app/common/apprenant';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { ApprenantAddEditComponent } from '../apprenant-add-edit/apprenant-add-edit.component';


@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'details', 'action'];
  apprenents: Apprenant[] = [];
  searchMode: boolean = false;
  dataSource!: MatTableDataSource<any>;
  noRecordsFound!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(private apprenantService: ApprenantService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listApprenant();
    });
  }

  listApprenant() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchApprenant();
    }
    else {
      this.handleListApprenant();
    }
  }

  handleSearchApprenant() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    // now search for the departements using keyword
    this.apprenantService.searchApprenant(theKeyword).subscribe(
      data => {
        this.apprenents = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  handleListApprenant() {
    this.apprenantService.getApprenantList().subscribe(
      data => {
        this.apprenents = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        //this.dataSource.paginator = this.paginator;
      }
    )
  }

  openEditAdminModal(data: any): void {
    this.dialog.open(ApprenantAddEditComponent, {
      width: '540px',
      data,
    });
  }

  redirectToDetails(id: number) {
    this.router.navigate(['admin/apprenants/details', id]);
  }

}
