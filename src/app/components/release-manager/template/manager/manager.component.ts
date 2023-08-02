import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfilManagerComponent} from "../../profil/profil-manager/profil-manager.component";
import {AddEditProjectComponent} from "../../projects/add-edit-project/add-edit-project.component";
import {ListProjetComponent} from "../../projects/list-projet/list-projet.component";
import { ListQuizComponent } from '../../quiz/list-quiz/list-quiz.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
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

  isQuizComponent(): boolean {
    return this.route.firstChild?.snapshot.component === ListQuizComponent;
  }


}
