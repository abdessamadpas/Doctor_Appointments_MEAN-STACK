import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-apply-doctor',
  templateUrl: './apply-doctor.component.html',
  styleUrls: ['./apply-doctor.component.css'],
})
export class ApplyDoctorComponent {
  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}
  email!: string;
  city!: string;
  phone!: string;
  date!: Date;
  isLoading = false;
  timeAvailable!: string;
  errorMessage = '';
  doctorId: string | null = null;
  numberOfAppointments: number = 0;
  daySlots: string[] = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
    '05:00 PM',
  ];
  bookedSlotes : string[] =[]

  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route
    this.route.paramMap.subscribe((params) => {
      this.doctorId = params.get('id');
    });
  }

  onDateChange() {
    this.isLoading = true;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (!this.date || new Date(this.date).setHours(0, 0, 0, 0) < currentDate.getTime()) {
      this.errorMessage = 'Please choose a valid date in the future!';
      this.isLoading = false;
      return;
    }
    this.errorMessage = '';
    this.appointmentService
      .dailyAppointmentsBooked(this.date, this.doctorId)
      .subscribe({
        next: (data) => {
          console.log("timePickedArray",data.timePickedArray);
          this.bookedSlotes = data.timePickedArray
          
          this.numberOfAppointments = data.dailyAppointmentsBooked;
          console.log(this.numberOfAppointments);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
          this.errorMessage = '';
          this.isLoading = false;
        },
      });
  }

 

  onSubmit() {
    this.isLoading = true;
    if (
      this.email == null ||
      this.city == null ||
      this.phone == null ||
      this.date == null ||
      this.timeAvailable == null
    ) {
      this.errorMessage = 'Please fill all the fields !';
      return;
    }
    this.errorMessage = '';
    this.appointmentService
      .bookAppointment(
        this.email,
        this.city,
        this.phone,
        this.date,
        this.timeAvailable,
        this.doctorId,
        localStorage.getItem('userId')

      
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
          this.errorMessage = '';
          this.resetFormFields();
          this.isLoading = false;
        },
      });
  }
  resetFormFields() {
    this.email = '';
    this.city = '';
    this.phone = '';
    this.date = new Date();
    this.timeAvailable = '';
  }
}
