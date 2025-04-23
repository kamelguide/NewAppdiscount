import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {CouponService} from "../coupon.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-coupon-dialog',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatProgressBar,
    CommonModule
    // same modules as edit component
  ],
  templateUrl: './create-coupon-dialog.component.html',
  styleUrl: './create-coupon-dialog.component.scss',
  standalone: true,
})
export class CreateCouponDialogComponent {




  form: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private dialogRef: MatDialogRef<CreateCouponDialogComponent>,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      productReference: ['', Validators.required],
      status: ['send', Validators.required], // valeur par défaut = 'send'
      idLink: [null, Validators.required]
    });

  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    const { email, productReference, status, idLink } = this.form.value;

    this.couponService.sendCoupon(email, productReference, status, idLink).subscribe({
      next: res => {
        this.successMessage = res;
        this.loading = false;
        setTimeout(() => this.dialogRef.close(), 1500);
      },
      error: err => {
        this.errorMessage = err.error || 'Erreur lors de l’envoi.';
        this.loading = false;
      }
    });
  }


  cancel() {
    this.dialogRef.close();
  }
}
