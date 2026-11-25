import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineComponent } from './medicine/medicine.component';
import { MedicineDetailComponent } from './medicine/medicine-detail/medicine-detail.component';

const routes: Routes = [
  {
    path : 'medicine',
    component : MedicineComponent
  },
  {
    path : 'medicine/:id',
    component : MedicineDetailComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
