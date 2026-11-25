
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AcountService } from 'src/app/account/account.service';
import { IMedProfile } from 'src/app/shared/Models/user';

@Component({
  selector: 'app-med-profile',
  templateUrl: './med-profile.component.html',
  styleUrls: ['./med-profile.component.scss']
})
export class MedProfileComponent implements OnInit {

  medProfile: IMedProfile = {
    nationalCode: null,
    bloodGroup: null
  };

  loading = false;
  errorMessage = '';

  constructor(private accountService: AcountService) { }

  ngOnInit(): void {
    this.getMedProfile();
  }

  getMedProfile(): void {

    this.loading = true;
    this.errorMessage = '';

    this.accountService.getMedProfile()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response: IMedProfile) => {
          this.medProfile = response ?? {
            nationalCode: null,
            bloodGroup: null
          };
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'خطا در دریافت اطلاعات پزشکی';
        }
      });
  }
}
