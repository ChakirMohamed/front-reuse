import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-step-show-modal',
  templateUrl: './step-show-modal.component.html',
  styleUrls: ['./step-show-modal.component.scss']
})
export class StepShowModalComponent {
  selectedStep: any;
  communesString: string;  // Add this property

  constructor(
    public dialogRef: MatDialogRef<StepShowModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedStep = data.step;
    this.communesString = this.formatCommunes(this.selectedStep.communes); // Format communes here
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  print(): void {
    window.print();
  }

  // Function to format the communes into a string
  formatCommunes(communes: any[]): string {
    return communes.map(commune => commune.nom).join(', ');
  }
}
