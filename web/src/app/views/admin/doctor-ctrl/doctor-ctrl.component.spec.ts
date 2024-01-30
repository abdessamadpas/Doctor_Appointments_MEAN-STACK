import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCtrlComponent } from './doctor-ctrl.component';

describe('DoctorCtrlComponent', () => {
  let component: DoctorCtrlComponent;
  let fixture: ComponentFixture<DoctorCtrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorCtrlComponent]
    });
    fixture = TestBed.createComponent(DoctorCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
