import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabinvoiceComponent } from './labinvoice.component';

describe('LabinvoiceComponent', () => {
  let component: LabinvoiceComponent;
  let fixture: ComponentFixture<LabinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
