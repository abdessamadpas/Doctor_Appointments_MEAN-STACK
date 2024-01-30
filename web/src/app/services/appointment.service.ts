import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  dailyAppointmentsBooked(date: Date, id: string | null) {
    let SERVER_URL =
      'http://localhost:3000/appointment/dailyAppointmentsBooked/' + id;
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });
    let body = {
      date: date,
    };
    return this.httpClient.post<any>(SERVER_URL, body, {
      headers: headers,
    });
  }
  bookAppointment(
    email: string,
    city: string,
    phone: string,
    date: Date,
    timeAvailable: string,
    doctorId: string | null,
    patientId: string | null
  ) {
    let SERVER_URL = 'http://localhost:3000/appointment/book';
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });
    if (patientId !== null) {
      patientId = patientId.replace(/"/g, '');
    }

    let body = {
      date: date,
      timePicked: timeAvailable,
      email: email,
      city: city,
      phone: phone,
      doctorId: doctorId,
      patientId: patientId,
    };
    console.log(body);

    return this.httpClient.post<any>(SERVER_URL, body, {
      headers: headers,
    });
  }

  changeStatusAppointment(appointmentId: string, status: string) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });

    appointmentId = appointmentId.replace(/"/g, '');
    let SERVER_URL =
      'http://localhost:3000/appointment/confirm/' + appointmentId;
    let body = {
      status: status,
    };
    console.log(body);

    return this.httpClient.put<any>(SERVER_URL, body, {
      headers: headers,
    });
  }

  getConfirmedAppointmentsDay(doctorId: string, date: Date) {
    doctorId = doctorId.replace(/"/g, '');
    let SERVER_URL =
      'http://localhost:3000/appointment/confirmed/today/' + doctorId;
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });

    let body = {
      date: date,
    };
    console.log(body);

    return this.httpClient.post<any>(SERVER_URL, body, {
      headers: headers,
    });
  }

  getNextAppoitments(doctorId: string) {
    doctorId = doctorId.replace(/"/g, '');

    let SERVER_URL = 'http://localhost:3000/appointment/patient/' + doctorId;
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });

    return this.httpClient.get<any>(SERVER_URL, {
      headers: headers,
    });
  }
}
