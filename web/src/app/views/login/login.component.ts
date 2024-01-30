import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  errorMessage = '';

  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('You are logged in');
    console.log(this.email, this.password);
    this.authService.init(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        let roles = [];
        if (response.user.isPatient) {
          roles.push('patient');
        }
        if (response.user.isAdmin) {
          roles.push('admin');
        }
        if (response.user.isDoctor) {
          roles.push('doctor');
        }
        localStorage.setItem('roles', JSON.stringify(roles));

        localStorage.setItem('userId', JSON.stringify(response.user._id));
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;  
      },
      complete: () => {
        if (localStorage.getItem('roles')?.includes('patient')) {
          this.router.navigateByUrl('/patient/dashboard');
        }
        if (localStorage.getItem('roles')?.includes('admin')) {
          this.router.navigateByUrl('/admin/dashboard');
        }
        if (localStorage.getItem('roles')?.includes('doctor')) {
          this.router.navigateByUrl('/doctor/dashboard');
        }

        this.cleanUpFields()
      },
    });
  }
  cleanUpFields(){
    this.email=""
    this.password=""
    this.errorMessage=""
  }
  toRegister(){
    this.router.navigateByUrl('/register');
  }
}
