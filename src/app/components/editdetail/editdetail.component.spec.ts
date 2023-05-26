import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdetailComponent } from './editdetail.component';

describe('EditdetailComponent', () => {
  let component: EditdetailComponent;
  let fixture: ComponentFixture<EditdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditdetailComponent]
    });
    fixture = TestBed.createComponent(EditdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
