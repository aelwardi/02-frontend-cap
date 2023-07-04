import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementsComponent } from './components/release-super-admin/departement/departements/departements.component';
import { HelpComponent } from './components/release-super-admin/helps/help/help.component';
import { SuperAdminComponent } from './components/release-super-admin/template/super-admin/super-admin.component';
import { HomeComponent } from './components/release-super-admin/homes/home/home.component';
import { AdminsComponent } from './components/release-super-admin/admin/admins/admins.component';
import { ProfileComponent } from './components/release-super-admin/profil/profile/profile.component';
import { AdminComponent } from './components/release-admin/template/admin/admin.component';
import { ListManagerComponent } from './components/release-admin/manager/list-manager/list-manager.component';
import { ManagerDetailsComponent } from './components/release-admin/manager/manager-details/manager-details.component';
import { ApprenantsComponent } from './components/release-admin/apprenant/apprenants/apprenants.component';
import { ApprenantDetailsComponent } from './components/release-admin/apprenant/apprenant-details/apprenant-details.component';
import { ListAssignmentComponent } from './components/release-admin/assignments/list-assignment/list-assignment.component';
import { ProfilComponent } from './components/release-admin/profil/profil/profil.component';
import { NavBarComponent } from './components/release-manager/template/nav-bar/nav-bar.component';
import { ManagerComponent } from './components/release-manager/template/manager/manager.component';
import { ListProjetComponent } from './components/release-manager/projects/list-projet/list-projet.component';

const routes: Routes = [
  {
    path: 'super-admin', component: SuperAdminComponent,
    children: [
      {
        path: 'departements',
        component: DepartementsComponent,
      },
      {
        path: 'departements/search/:keyword',
        component: DepartementsComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
      {
        path: 'admins/search/:keyword',
        component: AdminsComponent,
      },
      {
        path: 'settings',
        component: ProfileComponent,
      },
      {
        path: 'help',
        component: HelpComponent,
      },
    ],
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'managers',
        component: ListManagerComponent,
      },
      {
        path: 'managers/search/:keyword',
        component: ListManagerComponent,
      },
      {
        path: 'managers/details/:id',
        component: ManagerDetailsComponent,
      },
      {
        path: 'apprenants',
        component: ApprenantsComponent,
      },
      {
        path: 'apprenants/search-apprenant/:keyword',
        component: ApprenantsComponent,
      },
      {
        path: 'apprenants/details/:id',
        component: ApprenantDetailsComponent,
      },
      {
        path: 'assignments',
        component: ListAssignmentComponent,
      },
      {
        path: 'settings',
        component: ProfilComponent,
      },
      {
        path: 'help',
        component: HelpComponent,
      },
    ],
  },
  {
    path: 'manager', component: ManagerComponent,
    children: [
      {
        path: 'projects',
        component: ListProjetComponent,
      },
      {
        path: 'projects/search/:keyword',
        component: ListProjetComponent,
      }
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
