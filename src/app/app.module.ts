import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DepartementsComponent } from './components/departements/departements.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchComponent } from './components/search/search.component';
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DepartementAddEditComponent } from './components/departement-add-edit/departement-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminsComponent } from './components/admins/admins.component';
import { AddBtnAdminComponent } from './components/add-btn-admin/add-btn-admin.component';
import { SearchAdminComponent } from './components/search-admin/search-admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BodyWelcomeComponent } from './components/body-welcome/body-welcome.component';
import { BodyWelcomeViewComponent } from './components/body-welcome-view/body-welcome-view.component';
import { BodyWelcomeCardComponent } from './components/body-welcome-card/body-welcome-card.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HelpComponent } from './components/help/help.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DepartementsComponent,
    SearchComponent,
    AddBtnComponent,
    ConfirmDialogComponent,
    DepartementAddEditComponent,
    AdminsComponent,
    AddBtnAdminComponent,
    SearchAdminComponent,
    ToolbarComponent,
    BodyWelcomeComponent,
    BodyWelcomeViewComponent,
    BodyWelcomeCardComponent,
    LoginPageComponent,
    HelpComponent,
    ExamplePdfViewerComponent,
    SuperAdminComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
