import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private httpClient: HttpClient) {}

  init(email: string, password: string): Observable<any> {
    let SERVER_URL = 'http://localhost:3000/auth/login';
    let body = {
      email: email,
      password: password,
    };
    return this.httpClient.post<any>(SERVER_URL, body);
  }
  register(
    email: string,
    password: string,
    username: string,
    phone: string,
    isDoctor: boolean,
    isPatient: boolean
  ) {
    let SERVER_URL = 'http://localhost:3000/auth/signup';
    let body = {
      email: email,
      password: password,
      username: username,
      phone: phone,
      isDoctor: isDoctor,
      isPatient: isPatient,
    };
    console.log(body);
    
    return this.httpClient.post<any>(SERVER_URL, body);
  }
  getMe(): Observable<any> {
    let SERVER_URL = 'http://localhost:3000/auth/me';
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });
    return this.httpClient.get<any>(SERVER_URL, {
      headers: headers,
    });
  }

  isLoggedIn(JWT: string) {
    let SERVER_URL = '';
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + JWT,
      Accept: 'application/json',
    });
    return this.httpClient.get(SERVER_URL, {
      headers: headers,
    });
  }
  approveUser(userId: string, isSuspended: boolean) {
    let SERVER_URL = 'http://localhost:3000/auth/approve/' + userId;
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });
    let body = {
      isSuspended: isSuspended,
    };

    return this.httpClient.post<any>(SERVER_URL, body, {
      headers: headers,
    });
  }
  getRequests() {
    let SERVER_URL = 'http://localhost:3000/auth/requests';
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });

    return this.httpClient.get<any>(SERVER_URL, {
      headers: headers,
    });
  }
  getUsersInfo() {
    let SERVER_URL = 'http://localhost:3000/auth/usersInfo';
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });

    return this.httpClient.get<any>(SERVER_URL, {
      headers: headers,
    });
  }
  getUsers() {
    let SERVER_URL = 'http://localhost:3000/auth/all';
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      Accept: 'application/json',
    });

    return this.httpClient.get<any>(SERVER_URL, {
      headers: headers,
    });
  }
}
