import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDoctorComponent } from './pick-doctor.component';

describe('PickDoctorComponent', () => {
  let component: PickDoctorComponent;
  let fixture: ComponentFixture<PickDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickDoctorComponent]
    });
    fixture = TestBed.createComponent(PickDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
