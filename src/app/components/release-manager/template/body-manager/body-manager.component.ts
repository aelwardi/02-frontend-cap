import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfilManagerComponent} from "../../profil/profil-manager/profil-manager.component";
import {AddEditProjectComponent} from "../../projects/add-edit-project/add-edit-project.component";
import {ListProjetComponent} from "../../projects/list-projet/list-projet.component";

@Component({
  selector: 'app-body-manager',
  templateUrl: './body-manager.component.html',
  styleUrls: ['./body-manager.component.css']
})
export class BodyManagerComponent {
  constructor(private route: ActivatedRoute) {}

  isProfilComponent(): boolean {
    return this.route.firstChild?.snapshot.component === ProfilManagerComponent;
  }

  isAddEditProjectComponent(): boolean {
    return this.route.firstChild?.snapshot.component === AddEditProjectComponent;
  }

  isListProjectComponent(): boolean {
    return this.route.firstChild?.snapshot.component === ListProjetComponent;
  }

}
