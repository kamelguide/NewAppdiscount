import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Product } from '../product.data';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  styleUrls: ['./create-product-dialog.component.scss'],
  templateUrl: './create-product-dialog.component.html',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    // same modules as edit component
  ]
})
export class CreateProductDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
  ) {
    this.form = this.fb.group({
      referenceProduct: [''],
      description: [''],
      comment: [''],
      price: [0],
      quantiteDiscount: [0],
      image: ['']
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
