import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantAddEditComponent } from './apprenant-add-edit.component';

describe('ApprenantAddEditComponent', () => {
  let component: ApprenantAddEditComponent;
  let fixture: ComponentFixture<ApprenantAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprenantAddEditComponent]
    });
    fixture = TestBed.createComponent(ApprenantAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
