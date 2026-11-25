import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AcountService } from 'src/app/account/account.service';
import { IAddress } from '../../Models/user';

@Component({
  selector: 'app-add-address-checkout',
  templateUrl: './add-address-checkout.component.html',
  styleUrls: ['./add-address-checkout.component.scss']
})
export class AddAddressCheckoutComponent implements OnInit {
  @Output() newAddress = new EventEmitter<IAddress>();

  title?: string;
  closeBtnName?: string;

  form = new UntypedFormGroup({
    number: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)
    ]),
    isMain: new UntypedFormControl(true),
    state: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    city: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    firstName: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    lastName: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    fullAddress: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(300)
    ]),
    postalCode: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ])
  });

  constructor(
    public bsModalRef: BsModalRef,
    private accountService: AcountService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.title) {
      this.title = 'ثبت آدرس جدید';
    }
    if (!this.closeBtnName) {
      this.closeBtnName = 'بستن';
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.accountService.addAddress(this.form.value).subscribe({
      next: (resAddress: IAddress) => {
        this.newAddress.emit(resAddress);
        this.toast.success('آدرس جدید با موفقیت ثبت شد');
        this.bsModalRef.hide();
      },
      error: () => {
        this.toast.error('خطا در ثبت آدرس');
      }
    });
  }
}
