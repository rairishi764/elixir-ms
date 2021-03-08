import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationservicesComponent } from './consultationservices.component';
describe('ConsultationservicesComponent', () => {
  let component: ConsultationservicesComponent;
  let fixture: ComponentFixture<ConsultationservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
