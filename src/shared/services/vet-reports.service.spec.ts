import { TestBed } from '@angular/core/testing';

import { VetReportsService } from './vet-reports.service';

describe('VetReportsService', () => {
  let service: VetReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
