import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDoctorComponent } from './apply-doctor.component';

describe('ApplyDoctorComponent', () => {
  let component: ApplyDoctorComponent;
  let fixture: ComponentFixture<ApplyDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyDoctorComponent]
    });
    fixture = TestBed.createComponent(ApplyDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
