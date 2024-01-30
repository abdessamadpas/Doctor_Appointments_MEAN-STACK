import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email!: string;
  password!: string;
  username!: string;
  phone!: string;
  isDoctor: boolean= false;
  isPatient: boolean= false;
  isSuccess : boolean = false
  type! :string
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}
  onSubmit() {
    console.log('You are logged in');
    console.log(this.type);
    this.type == 'doctor'?   (this.isDoctor = true ) : (this.isPatient = true );

    this.authService
      .register(
        this.email,
        this.password,
        this.username,
        this.phone,
        this.isDoctor,
        this.isPatient
      )
      .subscribe({
        next: (response) => {},
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.cleanUpFields()
          this.isSuccess=true

        },
      });
  }
  cleanUpFields(){
    this.email=''
    this.username=""
    this.password=""
    this.phone="",
    this.type=""
  }
  toLogin(){
    this.router.navigateByUrl('/login');
  }
}
