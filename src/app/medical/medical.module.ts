import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical-routing.module';
import { MedicineComponent } from './medicine/medicine.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MedicineDetailComponent } from './medicine/medicine-detail/medicine-detail.component';


@NgModule({
  declarations: [
    MedicineComponent,
    MedicineDetailComponent
  ],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    FormsModule
  ]
})
export class MedicalModule { }
