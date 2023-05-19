import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DepartementListComponent } from './components/departement-list/departement-list.component';
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { AdminListComponent } from './components/admin-list/admin-list.component';

const routes: Routes = [
  {path: 'departements', component: DepartementListComponent},
  {path: 'admins', component: AdminListComponent},
  {path: '', redirectTo: '/departements', pathMatch: 'full' },
  {path: '**', redirectTo: '/departements', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    DepartementListComponent,
    AdminListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
