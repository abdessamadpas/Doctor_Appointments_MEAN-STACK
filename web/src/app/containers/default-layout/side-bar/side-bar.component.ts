import { Component } from '@angular/core';
import { constances } from 'src/app/core/constances';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  menus: any = [];
  filteredMenus: any[] = [];
  role!: string;
  constructor() {
    this.menus = constances.menus;

    console.log('complete');
    if (localStorage.getItem('roles')?.includes('patient')) {
      this.role = 'patient';
    }
    if (localStorage.getItem('roles')?.includes('admin')) {
     this.role = 'admin';
      
    }
    if (localStorage.getItem('roles')?.includes('doctor')) {
      this.role = 'doctor';
      
    }


    if (this.role != null) {
      this.menus.forEach((element: any) => {
        const isRolePresent = element.roles.find(
          (role: any) => role == this.role
        );
        if (isRolePresent != undefined) {
          this.filteredMenus.push(element);
        }
      });
    }
    console.log( 'sidebar =' , this.filteredMenus);
    
  }
}
