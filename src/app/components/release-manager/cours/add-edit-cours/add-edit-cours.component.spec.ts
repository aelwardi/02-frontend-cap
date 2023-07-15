import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCoursComponent } from './add-edit-cours.component';

describe('AddEditCoursComponent', () => {
  let component: AddEditCoursComponent;
  let fixture: ComponentFixture<AddEditCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCoursComponent]
    });
    fixture = TestBed.createComponent(AddEditCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
