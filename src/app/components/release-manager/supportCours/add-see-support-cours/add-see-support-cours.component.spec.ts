import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeeSupportCoursComponent } from './add-see-support-cours.component';

describe('AddSeeSupportCoursComponent', () => {
  let component: AddSeeSupportCoursComponent;
  let fixture: ComponentFixture<AddSeeSupportCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSeeSupportCoursComponent]
    });
    fixture = TestBed.createComponent(AddSeeSupportCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
