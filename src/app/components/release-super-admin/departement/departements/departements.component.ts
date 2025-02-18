import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Departement } from 'src/app/common/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DepartementAddEditComponent } from '../departement-add-edit/departement-add-edit.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.css']
})
export class DepartementsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'action'];
  departements: Departement[] = [];
  searchMode: boolean = false;
  dataSource!: MatTableDataSource<any>;
  noRecordsFound!: boolean;
  isLoading: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(private departementService: DepartementService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listDepartement();
    });
  }

  listDepartement() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchDepartement();
    }
    else {
      this.handleListDepartement();
    }
  }

  handleSearchDepartement() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the departements using keyword
    this.departementService.searchDepartement(theKeyword).subscribe(
      data => {
        this.departements = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  handleListDepartement() {
    this.departementService.getDepartementList().subscribe(
      data => {
        this.departements = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
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
        this.deleteDepartement(id);
      }
    });
  }

  openEditDepartmentModal(data: any): void {
    const dialogRef = this.dialog.open(DepartementAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listDepartement();
      }
      else {
        console.log(result);
      }
    });
  }

  deleteDepartement(id: number): void {
    this.isLoading = true;
    this.departementService.deleteDepartement(id).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading = false;
          this.listDepartement();
          this._snackBar.open('Department deleted successfully.', '', {
            duration: 2000,
            panelClass: ['green-snackbar'],
          });
        }, 1000);
      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading = false;
          this._snackBar.open('Not deleted department.', '', {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        }, 1000);
      }
    })
  }
  openAddDepartmentModal(): void {
    const dialogRef = this.dialog.open(DepartementAddEditComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listDepartement();
      }
      else {
        console.log(result);
      }
    });
  }
}
