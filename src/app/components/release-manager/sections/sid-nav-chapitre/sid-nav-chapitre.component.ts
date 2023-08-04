import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChapitreDTO } from 'src/app/common/chapitre-dto';
import { SectionService } from 'src/app/services/section.service';
import { NavigationSectionService } from 'src/app/services/navigation-section.service';
import { AddEditSectionComponent } from '../add-edit-section/add-edit-section.component';

@Component({
  selector: 'app-sid-nav-chapitre',
  templateUrl: './sid-nav-chapitre.component.html',
  styleUrls: ['./sid-nav-chapitre.component.css'],
})
export class SidNavChapitreComponent implements OnInit {
  chapitreDTO: ChapitreDTO[] = [];
  cousId: number = 1;
  isSidebarActive = false;
  showSections = false;
  indexDto: number = 0;
  indexSection: number = -1;
  chapitredtoCurrent: any;


  constructor(
    private sectionService: SectionService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private navigationSection: NavigationSectionService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listChapitre();
    });
  }

  listChapitre() {
    this.sectionService.getChapitreWithSection(this.cousId).subscribe(
      data => {
        this.chapitreDTO = data;
        const chapitreId = +this.route.snapshot.paramMap.get('id')!;
        this.chapitredtoCurrent = this.chapitreDTO.find((chapitre) => chapitre.chapitre!.id === chapitreId);
        this.navigationSection.chapitredto = this.chapitredtoCurrent.chapitre;
        //console.log(this.navigationSection.chapitredto);
      }
    )
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  toggleHomeSubmenu(event: Event) {
    event.preventDefault();
    this.showSections = !this.showSections;
  }

  addSection(data: any): void {
    const dialogRef = this.dialog.open(AddEditSectionComponent, {
      width: '550px',
      data,
    })
  }

  next() {
    const chapitreId = +this.route.snapshot.paramMap.get('id')!;
    this.chapitredtoCurrent = this.chapitreDTO.find((chapitre) => chapitre.chapitre!.id === chapitreId);
    if (this.chapitredtoCurrent) {
      this.indexDto = this.chapitreDTO.indexOf(this.chapitredtoCurrent);
      //console.log('index de chapitre: ' + this.indexDto);
      //console.log(chapitredtoCurrent);
      const sectionId = this.navigationSection.sectionId;
      this.indexSection = this.chapitredtoCurrent.sections.findIndex((section: any) => section.id === sectionId);
      //console.log('index de section: ' + this.indexSection);
      if (this.indexSection < (this.chapitredtoCurrent.sections.length - 1)) {
        this.indexSection++;
        this.router.navigate([`manager/chapitre/${this.chapitredtoCurrent.chapitre!.id}/${this.chapitredtoCurrent.sections[this.indexSection].id}`]);
        console.log(this.indexSection);
      } else {
        if (this.indexDto < (this.chapitreDTO.length - 1)) {
          this.indexDto++;
          this.router.navigate([`manager/chapitre/${this.chapitreDTO[this.indexDto].chapitre!.id}`]);
        }
      }
      //console.log('index de section: ' + this.indexSection);
    }
  }

  prev() {
    const chapitreId = +this.route.snapshot.paramMap.get('id')!;
    this.chapitredtoCurrent = this.chapitreDTO.find((chapitre) => chapitre.chapitre!.id === chapitreId);
    if (this.chapitredtoCurrent) {
      this.indexDto = this.chapitreDTO.indexOf(this.chapitredtoCurrent);
      //console.log('index de chapitre: ' + this.indexDto);
      //console.log(chapitredtoCurrent);
      const sectionId = this.navigationSection.sectionId;
      if (sectionId) {
        this.indexSection = this.chapitredtoCurrent.sections.findIndex((section: any) => section.id === sectionId);
      }
      console.log('index de section:::: ' + this.indexSection);
      if (this.indexSection > 0) {
        this.indexSection--;
        if ((this.indexSection + 1) > 0) {
          this.router.navigate([`manager/chapitre/${this.chapitredtoCurrent.chapitre!.id}/${this.chapitredtoCurrent.sections[this.indexSection].id}`]);
          console.log(this.indexSection + "hello");
        } else {
          //this.indexSection = -1;
          console.log(this.indexSection);
          console.log("where are u?");
          if ((this.indexDto + 1) > 0) {
            this.indexDto--;
            this.indexSection = this.chapitreDTO[this.indexDto].sections.length;
            if ((this.indexSection + 1) > 0) {
              this.router.navigate([`manager/chapitre/${this.chapitreDTO[this.indexDto].chapitre!.id}/${this.chapitreDTO[this.indexDto].sections[this.indexSection].id}`]);
            }
            if ((this.indexDto + 1) > 0) {
              this.router.navigate([`manager/chapitre/${this.chapitreDTO[this.indexDto].chapitre!.id}`]);
            }
          } else {
            console.log("premier chapitre");
          }
        }
      } else {
        console.log("ok....");
        this.indexSection = this.chapitreDTO[this.indexDto].sections.length;
        this.indexDto--;
        if ((this.indexDto + 1) > 0) {
          this.indexSection = this.chapitreDTO[this.indexDto].sections.length;
          //console.log(this.indexSection);
          //console.log(this.indexDto);
          if ((this.indexDto + 1) > 0) {
            this.router.navigate([`manager/chapitre/${this.chapitreDTO[this.indexDto].chapitre!.id}`]);
          }
        }
      }
      //console.log('index de section: ' + this.indexSection);
    }
  }
}
