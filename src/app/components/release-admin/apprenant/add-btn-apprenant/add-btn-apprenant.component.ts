import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApprenantAddEditComponent } from '../apprenant-add-edit/apprenant-add-edit.component';

@Component({
  selector: 'app-add-btn-apprenant',
  templateUrl: './add-btn-apprenant.component.html',
  styleUrls: ['./add-btn-apprenant.component.css']
})
export class AddBtnApprenantComponent {

  constructor(private dialog: MatDialog) { }

  openAddApprenantModal(): void {


    // const dialogConfig = new MatDialogConfig();

    // if (operationType === 'Add') {
    //   dialogConfig.width = '500px'; // Adjust the desired width for Add operation
    //   dialogConfig.height = '300px'; // Adjust the desired height for Add operation
    // } else if (operationType === 'Update') {
    //   dialogConfig.width = '800px'; // Adjust the desired width for Update operation
    //   dialogConfig.height = '400px'; // Adjust the desired height for Update operation
    // }

    const dialogRef = this.dialog.open(ApprenantAddEditComponent, {
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
