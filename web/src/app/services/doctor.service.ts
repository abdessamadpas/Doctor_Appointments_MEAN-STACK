import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private httpClient: HttpClient) {}
  getDoctors() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });
    let SERVER_URL = 'http://localhost:3000/doctor/all';
    return this.httpClient.get<any>(SERVER_URL, {
      headers: headers,
    });
  }
  getDoctorByUserId(id: string) {
    let SERVER_URL = 'http://localhost:3000/doctor/user/' + id;
    return this.httpClient.get<any>(SERVER_URL);
  }

  getDoctorPatients(id: string) {
    let SERVER_URL = 'http://localhost:3000/doctor/patients/' + id;
    return this.httpClient.get<any>(SERVER_URL);
  }

  getDoctorAppointments(id: string | null) {
    id = id!.replace(/"/g, '');

    let SERVER_URL = 'http://localhost:3000/appointment/doctor/' + id;
    return this.httpClient.get<any>(SERVER_URL);
  }


  getSuspepndedDoctors() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });
    let SERVER_URL = 'http://localhost:3000/doctor/suspendeddoctors/';
    return this.httpClient.get<any>(SERVER_URL, {
      headers: headers,
    });
  }
 
}
