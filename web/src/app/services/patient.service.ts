import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) {}
  getPatient(id: string) {
    let SERVER_URL = 'http://localhost:3000/patient/' + id;
    return this.httpClient.get<any>(SERVER_URL);
  }
  getDoctor(id: string) {
    let SERVER_URL = 'http://localhost:3000/doctor' + id;
    return this.httpClient.get<any>(SERVER_URL);
  }
  getPatients   () {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });
    let SERVER_URL = 'http://localhost:3000/patient/all';
    return this.httpClient.get<any>(SERVER_URL,{
      headers: headers,
    
    });
  }

  getPatientAppointments(id: string) {
    id = id.replace(/"/g, '');

    let SERVER_URL = 'http://localhost:3000/appointment/patient/' + id;
    console.log(SERVER_URL);
    
    return this.httpClient.get<any>(SERVER_URL);
  }


}
