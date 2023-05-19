import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Departement } from 'src/app/common/departement';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {

  departements: Departement[] = [];
  constructor(private departementService: DepartementService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listDepartement();
  }

  listDepartement() {
    this.departementService.getDepartementList().subscribe(
      data => {
        this.departements = data;
      }
    )
  }

}
