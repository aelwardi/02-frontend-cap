import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  admins: Admin[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listAdmin();
  }

  listAdmin() {
    this.adminService.getAdminList().subscribe(
      data => {
        this.admins = data;
      }
    )
  }

}
