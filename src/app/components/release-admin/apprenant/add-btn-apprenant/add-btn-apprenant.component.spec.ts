import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBtnApprenantComponent } from './add-btn-apprenant.component';

describe('AddBtnApprenantComponent', () => {
  let component: AddBtnApprenantComponent;
  let fixture: ComponentFixture<AddBtnApprenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBtnApprenantComponent]
    });
    fixture = TestBed.createComponent(AddBtnApprenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
