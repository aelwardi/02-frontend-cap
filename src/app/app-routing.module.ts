import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementsComponent } from './components/departements/departements.component';

const routes: Routes = [
  { path: 'departements', component: DepartementsComponent },
  { path: 'search/:keyword', component: DepartementsComponent },
  { path: 'departements/:id', component: DepartementsComponent },
  { path: '', redirectTo: '/departements', pathMatch: 'full' },
  { path: '**', redirectTo: '/departements', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
