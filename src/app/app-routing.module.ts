import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementsComponent } from './components/departements/departements.component';
import { AdminsComponent } from './components/admins/admins.component';
import { HelpComponent } from './components/help/help.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'super-admin', component: SuperAdminComponent,
    // canActivate: [AuthGuard], // Appliquer l'AuthGuard ici
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
