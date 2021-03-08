import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationinvoiceComponent } from './consultationinvoice.component';

describe('ConsultationinvoiceComponent', () => {
  let component: ConsultationinvoiceComponent;
  let fixture: ComponentFixture<ConsultationinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
