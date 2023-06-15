import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagerAddEditComponent } from '../manager-add-edit/manager-add-edit.component';

@Component({
  selector: 'app-add-btn-manager',
  templateUrl: './add-btn-manager.component.html',
  styleUrls: ['./add-btn-manager.component.css']
})
export class AddBtnManagerComponent {

  constructor(private dialog: MatDialog) { }

  openAddManagerModal(): void {

    const dialogRef = this.dialog.open( ManagerAddEditComponent, {
      width: '540px'

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
