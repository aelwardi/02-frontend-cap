import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchApprenantComponent } from './search-apprenant.component';

describe('SearchApprenantComponent', () => {
  let component: SearchApprenantComponent;
  let fixture: ComponentFixture<SearchApprenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchApprenantComponent]
    });
    fixture = TestBed.createComponent(SearchApprenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
