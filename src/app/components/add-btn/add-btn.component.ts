import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartementAddEditComponent } from '../departement-add-edit/departement-add-edit.component';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.css']
})
export class AddBtnComponent {

  constructor(private dialog: MatDialog) { }

  openAddDepartmentModal(): void {
    const dialogRef = this.dialog.open(DepartementAddEditComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      else {
        console.log(result);
      }
    });
  }
}
