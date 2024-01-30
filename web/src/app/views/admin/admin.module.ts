import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RequestsComponent
  ],
  imports: [CommonModule, AdminRoutingModule, NgApexchartsModule,FormsModule],
})
export class AdminModule {}
