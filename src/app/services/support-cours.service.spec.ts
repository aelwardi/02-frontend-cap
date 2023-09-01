import { TestBed } from '@angular/core/testing';

import { SupportCoursService } from './support-cours.service';

describe('SupportCoursService', () => {
  let service: SupportCoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportCoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
