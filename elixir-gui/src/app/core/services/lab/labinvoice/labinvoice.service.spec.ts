import { TestBed } from '@angular/core/testing';

import { LabinvoiceService } from './labinvoice.service';

describe('LabinvoiceService', () => {
  let service: LabinvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabinvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
