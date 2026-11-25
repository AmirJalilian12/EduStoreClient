
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalService } from '../../medical.service';
import { IMedicine } from '../../../shared/Models/medicine';

@Component({
  selector: 'app-medicine-detail',
  templateUrl: './medicine-detail.component.html',
  styleUrls: ['./medicine-detail.component.scss']
})
export class MedicineDetailComponent implements OnInit {

  medicine: IMedicine | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicalService: MedicalService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      if (!Number.isInteger(id) || id <= 0) {
        this.errorMessage = 'شناسه دارو معتبر نیست.';
        return;
      }

      this.getMedicineDetail(id);
    });
  }

  getMedicineDetail(id: number): void {

    this.loading = true;
    this.errorMessage = '';
    this.medicine = null;

    this.medicalService.getMedicine(id).subscribe({

      next: (response: IMedicine) => {
        this.medicine = response;
        this.loading = false;
      },

      error: (error) => {
        console.error('Medicine Detail Error:', error);

        this.errorMessage = error.status === 404
          ? 'داروی مورد نظر یافت نشد.'
          : 'خطا در دریافت اطلاعات دارو.';

        this.loading = false;
      }

    });
  }

  goBack(): void {
    this.router.navigate(['/medical/medicine']);
  }
}
