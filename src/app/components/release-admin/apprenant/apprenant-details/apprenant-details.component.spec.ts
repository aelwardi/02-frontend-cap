import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantDetailsComponent } from './apprenant-details.component';

describe('ApprenantDetailsComponent', () => {
  let component: ApprenantDetailsComponent;
  let fixture: ComponentFixture<ApprenantDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprenantDetailsComponent]
    });
    fixture = TestBed.createComponent(ApprenantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
