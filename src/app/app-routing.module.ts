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

import { AdminDetailsComponent } from './components/release-super-admin/admin/admin-details/admin-details.component';

import { ListAssignmentComponent } from './components/release-admin/assignments/list-assignment/list-assignment.component';
import { ProfilComponent } from './components/release-admin/profil/profil/profil.component';
import { NavBarComponent } from './components/release-manager/template/nav-bar/nav-bar.component';
import { ManagerComponent } from './components/release-manager/template/manager/manager.component';
import { ListProjetComponent } from './components/release-manager/projects/list-projet/list-projet.component';

import { ProfilManagerComponent } from './components/release-manager/profil/profil-manager/profil-manager.component';

import { ListQuizComponent } from './components/release-manager/quiz/list-quiz/list-quiz.component';
import { SidNavChapitreComponent } from './components/release-manager/sections/sid-nav-chapitre/sid-nav-chapitre.component';
import { ChapitresComponent } from './components/release-manager/chapitre/chapitres/chapitres.component';
import { CoursComponent } from './components/release-manager/courses/cours/cours.component';
import { PageNotFoundComponent } from './components/release-super-admin/template/page-not-found/page-not-found.component';
import { HelpsComponent } from './components/release-manager/helps/helps/helps.component';



const routes: Routes = [
  {
    path: 'super-admin', component: SuperAdminComponent,
    children: [
      {
        path: 'departements',
        component: DepartementsComponent,
        data: { pageTitle: 'List Departements' }
      },
      {
        path: 'departements/search/:keyword',
        component: DepartementsComponent,
        data: { pageTitle: 'Search Departement' }
      },
      {
        path: 'admins',
        component: AdminsComponent,
        data: { pageTitle: 'List Administrators' }
      },
      {
        path: 'admins/search/:keyword',
        component: AdminsComponent,
        data: { pageTitle: 'Search Administrator' }
      },
      {
        path: 'admins/details/:id',
        component: AdminDetailsComponent,
        data: { pageTitle: 'Details Administrator' }
      },
      {
        path: 'settings',
        component: ProfileComponent,
        data: { pageTitle: 'Profile' }
      },
      {
        path: 'help',
        component: HelpComponent,
        data: { pageTitle: 'Help' }
      },
      {
        path: '**', component: PageNotFoundComponent,
        data: { pageTitle: 'Page not found' }
      }
    ],
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'managers',
        component: ListManagerComponent,
        data: { pageTitle: 'List Managers' }
      },
      {
        path: 'managers/search/:keyword',
        component: ListManagerComponent,
        data: { pageTitle: 'Search Manager' }
      },
      {
        path: 'managers/details/:id',
        component: ManagerDetailsComponent,
        data: { pageTitle: 'Details Manager' }
      },
      {
        path: 'apprenants',
        component: ApprenantsComponent,
        data: { pageTitle: 'List Consultants' }
      },
      {
        path: 'apprenants/search-apprenant/:keyword',
        component: ApprenantsComponent,
        data: { pageTitle: 'Search Consultant' }
      },
      {
        path: 'apprenants/details/:id',
        component: ApprenantDetailsComponent,
        data: { pageTitle: 'Details Consultant' }
      },
      {
        path: 'assignments',
        component: ListAssignmentComponent,
        data: { pageTitle: 'Assignments' }
      },
      {
        path: 'settings',
        component: ProfilComponent,
        data: { pageTitle: 'Profile' }
      },
      {
        path: 'help',
        component: HelpComponent,
        data: { pageTitle: 'Help' }
      },
      {
        path: '**', component: PageNotFoundComponent,
        data: { pageTitle: 'Page not found' }
      }
    ],
  },
  {
    path: 'manager', component: ManagerComponent,
    children: [
      {
        path: 'projects',
        component: ListProjetComponent,
        data: { pageTitle: 'List projects' }
      },
      {
        path: 'projects/:id',
        component: CoursComponent,
        data: { pageTitle: 'List Courses' }
      },
      {
        path: 'projects/search/:keyword',
        component: ListProjetComponent,
        data: { pageTitle: 'Search project' }
      },
      {
        path: 'settings',
        component: ProfilManagerComponent,
        data: { pageTitle: 'Profile' }

      },
      {
        path: 'quiz/:id',
        component: ListQuizComponent,
        data: { pageTitle: 'List Quiz' }
      },
      {
        path: 'chapitre/:id', component: SidNavChapitreComponent,
        data: { pageTitle: 'List Sections' }
      },
      {
        path: 'cours/:id', component: ChapitresComponent,
        data: { pageTitle: 'List chapters' }
      },
      {
        path: 'help',
        component: HelpsComponent,
        data: { pageTitle: 'Help' }
      },
      {
        path: '**', component: PageNotFoundComponent,
        data: { pageTitle: 'Page not found' }
      }
    ],
  },
  { path: 'home', component: HomeComponent, data: { pageTitle: 'Home Page' } },
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { pageTitle: 'Home' }},
  { path: '**', redirectTo: '/home', pathMatch: 'full', data: { pageTitle: 'Home' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
