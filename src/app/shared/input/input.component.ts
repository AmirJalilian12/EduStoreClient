import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: ElementRef;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() set lable(val: string) {
    if (val) this.label = val;
  }

  disabled = false;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];
    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }

  onChange(event: any) {}
  onTouched(event?: any) {}

  writeValue(obj: any): void {
    if (this.input) {
      this.input.nativeElement.value = obj || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
