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
import { BodyComponent } from './components/release-super-admin/template/body/body.component';
import { SidenavComponent } from './components/release-super-admin/template/sidenav/sidenav.component';
import { DepartementsComponent } from './components/release-super-admin/departement/departements/departements.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchComponent } from './components/release-super-admin/departement/search/search.component';
import { ConfirmDialogComponent } from './components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { DepartementAddEditComponent } from './components/release-super-admin/departement/departement-add-edit/departement-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchAdminComponent } from './components/release-super-admin/admin/search-admin/search-admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/release-super-admin/homes/toolbar/toolbar.component';
import { BodyWelcomeComponent } from './components/release-super-admin/homes/body-welcome/body-welcome.component';
import { BodyWelcomeViewComponent } from './components/release-super-admin/homes/body-welcome-view/body-welcome-view.component';
import { BodyWelcomeCardComponent } from './components/release-super-admin/homes/body-welcome-card/body-welcome-card.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginPageComponent } from './components/release-super-admin/homes/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HelpComponent } from './components/release-super-admin/helps/help/help.component';
import { SuperAdminComponent } from './components/release-super-admin/template/super-admin/super-admin.component';
import { HomeComponent } from './components/release-super-admin/homes/home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdminsComponent } from './components/release-super-admin/admin/admins/admins.component';
import { AdminAddEditComponent } from './components/release-super-admin/admin/admin-add-edit/admin-add-edit.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileComponent } from './components/release-super-admin/profil/profile/profile.component';
import { AdminComponent } from './components/release-admin/template/admin/admin.component';
import { SidenavAdminComponent } from './components/release-admin/template/sidenav-admin/sidenav-admin.component';
import { BodyAdminComponent } from './components/release-admin/template/body-admin/body-admin.component';
import { ListManagerComponent } from './components/release-admin/manager/list-manager/list-manager.component';
import { SearchManagerComponent } from './components/release-admin/manager/search-manager/search-manager.component';
import { ManagerAddEditComponent } from './components/release-admin/manager/manager-add-edit/manager-add-edit.component';
import { ManagerDetailsComponent } from './components/release-admin/manager/manager-details/manager-details.component';
import { ApprenantsComponent } from './components/release-admin/apprenant/apprenants/apprenants.component';
import { ApprenantAddEditComponent } from './components/release-admin/apprenant/apprenant-add-edit/apprenant-add-edit.component';
import { ApprenantDetailsComponent } from './components/release-admin/apprenant/apprenant-details/apprenant-details.component';
import { SearchApprenantComponent } from './components/release-admin/apprenant/search-apprenant/search-apprenant.component';
import { ListAssignmentComponent } from './components/release-admin/assignments/list-assignment/list-assignment.component';
import { AssignmentAddComponent } from './components/release-admin/assignments/assignment-add/assignment-add.component';
import { ProfilComponent } from './components/release-admin/profil/profil/profil.component';
import { NavBarComponent } from './components/release-manager/template/nav-bar/nav-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { ManagerComponent } from './components/release-manager/template/manager/manager.component';
import { BannerComponent } from './components/release-manager/template/banner/banner.component';
import { BodyManagerComponent } from './components/release-manager/template/body-manager/body-manager.component';
import { ListProjetComponent } from './components/release-manager/projects/list-projet/list-projet.component';
import { AddEditProjectComponent } from './components/release-manager/projects/add-edit-project/add-edit-project.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProfilManagerComponent } from './components/release-manager/profil/profil-manager/profil-manager.component';
import { AdminDetailsComponent } from './components/release-super-admin/admin/admin-details/admin-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AddEditCoursComponent } from './components/release-manager/courses/add-edit-cours/add-edit-cours.component';
import { ListQuizComponent } from './components/release-manager/quiz/list-quiz/list-quiz.component';
import { MatDividerModule } from '@angular/material/divider';
import { AddEditQuizComponent } from './components/release-manager/quiz/add-edit-quiz/add-edit-quiz.component';
import { NavBarBlueComponent } from './components/release-manager/template/nav-bar-blue/nav-bar-blue.component';
import { SidNavChapitreComponent } from './components/release-manager/sections/sid-nav-chapitre/sid-nav-chapitre.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { AddEditSectionComponent } from './components/release-manager/sections/add-edit-section/add-edit-section.component';
import { ChapitresComponent } from './components/release-manager/chapitre/chapitres/chapitres.component';
import { AddEditChapitreComponent } from './components/release-manager/chapitre/add-edit-chapitre/add-edit-chapitre.component';
import { AddManagerCoursComponent } from './components/release-manager/chapitre/add-manager-cours/add-manager-cours.component';
import { CoursComponent } from './components/release-manager/courses/cours/cours.component';
import { AddApprenantProjetComponent } from './components/release-manager/courses/add-apprenant-projet/add-apprenant-projet.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ContraintComponent } from './components/release-manager/courses/contraint/contraint.component';
import { PageNotFoundComponent } from './components/release-super-admin/template/page-not-found/page-not-found.component';
import { HelpsComponent } from './components/release-manager/helps/helps/helps.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DepartementsComponent,
    SearchComponent,
    ConfirmDialogComponent,
    DepartementAddEditComponent,
    AdminsComponent,
    AdminDetailsComponent,
    SearchAdminComponent,
    ToolbarComponent,
    BodyWelcomeComponent,
    BodyWelcomeViewComponent,
    BodyWelcomeCardComponent,
    LoginPageComponent,
    HelpComponent,
    SuperAdminComponent,
    HomeComponent,
    AdminAddEditComponent,
    ProfileComponent,
    AdminComponent,
    SidenavAdminComponent,
    BodyAdminComponent,
    ListManagerComponent,
    SearchManagerComponent,
    ManagerAddEditComponent,
    ManagerDetailsComponent,
    ApprenantsComponent,
    ApprenantsComponent,
    ApprenantAddEditComponent,
    ApprenantDetailsComponent,
    SearchApprenantComponent,
    ListAssignmentComponent,
    AssignmentAddComponent,
    ProfilComponent,
    NavBarComponent,
    ManagerComponent,
    BannerComponent,
    BodyManagerComponent,
    ListProjetComponent,
    AddEditProjectComponent,
    ProfilManagerComponent,
    AddEditCoursComponent,
    ListQuizComponent,
    AddEditQuizComponent,
    NavBarBlueComponent,
    SidNavChapitreComponent,
    AddEditSectionComponent,
    ChapitresComponent,
    AddEditChapitreComponent,
    AddManagerCoursComponent,
    CoursComponent,
    AddApprenantProjetComponent,
    ContraintComponent,
    PageNotFoundComponent,
    HelpsComponent,

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
    MatSelectModule,
    NgSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxExtendedPdfViewerModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatBadgeModule,
    MatGridListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatListModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatTreeModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
