import { Component } from '@angular/core';
import { AdminAddEditComponent } from '../admin-add-edit/admin-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-btn-admin',
  templateUrl: './add-btn-admin.component.html',
  styleUrls: ['./add-btn-admin.component.css']
})
export class AddBtnAdminComponent {

  constructor(private dialog: MatDialog) { }

  openAddAdminModal(): void {


    // const dialogConfig = new MatDialogConfig();

    // if (operationType === 'Add') {
    //   dialogConfig.width = '500px'; // Adjust the desired width for Add operation
    //   dialogConfig.height = '300px'; // Adjust the desired height for Add operation
    // } else if (operationType === 'Update') {
    //   dialogConfig.width = '800px'; // Adjust the desired width for Update operation
    //   dialogConfig.height = '400px'; // Adjust the desired height for Update operation
    // }

    const dialogRef = this.dialog.open(AdminAddEditComponent, {
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
