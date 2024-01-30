import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  username: string | undefined;
  role: string | undefined;

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.username = JSON.parse(atob(token!.split('.')[1])).user.username;
    this.role = JSON.parse(atob(token!.split('.')[1])).user.isDoctor
      ? 'Doctor'
      : 'Patient';
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isPatient');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isDoctor');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/login');
  }
}
