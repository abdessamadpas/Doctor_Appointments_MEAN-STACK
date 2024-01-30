import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
interface Users {
  doctors: number;
  admins: number;
  patients: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  usersInfo!: Users;
  users: any = [];
  constructor(private authService: AuthenticateService) { }
  ngOnInit(): void {
    this.getUsersInfo();
    this.getUsers();
  }
  getUsersInfo() {
    this.authService.getUsersInfo().subscribe((data: any) => {
      this.usersInfo = data;
    });
  }
  getUsers() {
    this.authService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }
}
