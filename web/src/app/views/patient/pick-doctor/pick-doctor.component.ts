import { Component } from '@angular/core';
import { Doctor } from 'src/app/models/Doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-pick-doctor',
  templateUrl: './pick-doctor.component.html',
  styleUrls: ['./pick-doctor.component.css'],
})
export class PickDoctorComponent {
  doctorList : Doctor[] = [];
  constructor(private doctorService: DoctorService) {}
  ngOnInit() {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctorList = data;   
      console.log(this.doctorList);
         
    });
  }
}
