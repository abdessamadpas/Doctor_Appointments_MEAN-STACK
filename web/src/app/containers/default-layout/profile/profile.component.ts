import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;

  constructor(private authSevice: AuthenticateService) {}

  ngOnInit(): void {
    this.authSevice.getMe().subscribe((data: any) => {
      this.user = data;
      console.log('wewe', data);
    });
  }
}
