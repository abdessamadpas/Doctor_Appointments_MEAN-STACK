import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCtrlComponent } from './patient-ctrl.component';

describe('PatientCtrlComponent', () => {
  let component: PatientCtrlComponent;
  let fixture: ComponentFixture<PatientCtrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientCtrlComponent]
    });
    fixture = TestBed.createComponent(PatientCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
