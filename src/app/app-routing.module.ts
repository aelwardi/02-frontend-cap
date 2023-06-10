import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementsComponent } from './components/release-super-admin/departement/departements/departements.component';
import { HelpComponent } from './components/release-super-admin/helps/help/help.component';
import { SuperAdminComponent } from './components/release-super-admin/template/super-admin/super-admin.component';
import { HomeComponent } from './components/release-super-admin/homes/home/home.component';
import { AdminsComponent } from './components/release-super-admin/admin/admins/admins.component';
import { ProfileComponent } from './components/release-super-admin/profil/profile/profile.component';

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
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
