
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationComponent } from './notification/notification.component';
import { OrdersComponent } from './orders/orders.component';

import { ProfileRoutingModule } from './profile-routing.module';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { CastEnumPipe } from '../shared/pipes/cast-enum.pipe';
import { ShamsiPipe } from '../shared/pipes/shamsi.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MedProfileComponent } from './med-profile/med-profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    NotificationComponent,
    OrdersComponent,
    MedProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ProfileRoutingModule,
    CoreModule,
    SharedModule,
    MatSidenavModule,
    CastEnumPipe,
    ShamsiPipe,
]
})
export class ProfileModule { }
