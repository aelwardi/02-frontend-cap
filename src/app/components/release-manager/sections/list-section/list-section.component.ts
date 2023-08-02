import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { SectionService } from 'src/app/services/section.service';
import { NavigationSectionService } from 'src/app/services/navigation-section.service';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.css'],
})
export class ListSectionComponent implements OnInit {
  section!: any;
  currentId: number | null = null; // Variable pour suivre l'ID actuel dans l'URL

  constructor(
    private sectionService: SectionService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private navigationSection: NavigationSectionService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const newId = +this.route.snapshot.paramMap.get('id')!;
        if (this.currentId !== newId) {
          this.currentId = newId;
          window.location.reload();
        } else {
          this.getSection();
        }
      }
      this.getSection();
    });
  }

  getSection() {
    const theId = +this.route.snapshot.paramMap.get('id')!;
    this.navigationSection.sectionId = +theId;
    this.sectionService.getSection(theId).subscribe(
      data => {
        this.section = data;
      }
    );
  } 
}
