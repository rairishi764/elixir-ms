import { TestBed } from '@angular/core/testing';

import { ConsultationinvoiceService } from './consultationinvoice.service';

describe('ConsultationinvoiceService', () => {
  let service: ConsultationinvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationinvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
