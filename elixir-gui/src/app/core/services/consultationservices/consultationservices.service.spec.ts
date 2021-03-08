import { TestBed } from '@angular/core/testing';

import { ConsultationservicesService } from './consultationservices.service';

describe('ConsultationservicesService', () => {
  let service: ConsultationservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
