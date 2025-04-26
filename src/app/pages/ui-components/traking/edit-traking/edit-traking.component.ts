import {Component, Inject} from '@angular/core';
import {TrackingData} from "../traking.data";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-edit-traking',
  imports: [
    MatFormField,
    MatDialogActions,
    MatDialogModule,
    FormsModule,
    MatInput,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatLabel
  ],
  templateUrl: './edit-traking.component.html',
  styleUrl: './edit-traking.component.scss',
  standalone:true,
})
export class EditTrakingComponent {
  trackingData: TrackingData;

  constructor(
    private dialogRef: MatDialogRef<EditTrakingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrackingData
  ) {
    this.trackingData = { ...data };  // Create a copy of the data passed from the parent component
  }

  save() {
    this.dialogRef.close(this.trackingData); // Send updated data back to the parent
  }

  cancel() {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
