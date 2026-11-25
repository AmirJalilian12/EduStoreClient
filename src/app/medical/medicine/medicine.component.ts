import { Component, OnInit } from '@angular/core';
import { MedicalService } from '../medical.service';
import { IMedicine } from 'src/app/shared/Models/medicine';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  medicines: IMedicine[] = [];
  loading = false;
  searchTerm = '';

  totalCount = 0;
  pageIndex = 1;
  pageSize = 10;

  constructor(private medService: MedicalService) { }

  ngOnInit(): void {
    this.getMedicines();
  }

getMedicines(): void {
  this.loading = true;

  const params = this.medService.getMedicineParams();
  params.pageIndex = this.pageIndex;
  params.pageSize = this.pageSize;
  params.search = this.searchTerm;

  this.medService.getMedicines().subscribe({
    next: response => {
      console.log('Full API Response:', response);
      console.log('Medicine List:', response.result);
      console.log('First Medicine:', response.result?.[0]);
      console.log('First Medicine ID:', response.result?.[0]?.id);

      this.medicines = response.result;
      this.totalCount = response.count;
      this.loading = false;
    },
    error: err => {
      console.error('Get Medicines Error:', err);
      this.loading = false;
    }
  });
}

  searchMedicines(): void {
    this.pageIndex = 1;
    this.getMedicines();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.pageIndex = page;
    this.getMedicines();
  }
}