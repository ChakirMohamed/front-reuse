import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StepService } from '../../../../services/step.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-step-show-modal',
  templateUrl: './step-show-modal.component.html',
  styleUrls: ['./step-show-modal.component.scss']
})
export class StepShowModalComponent {
  selectedStep: any;
  //communesString: string;
  displayedColumns: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<StepShowModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stepservice:StepService,
    private toastr: ToastrService
  ) {
    this.selectedStep = data.step;  // Receive step data
    //this.communesString = this.formatCommunes(this.selectedStep.communes); // Format communes here
    this.setDisplayedColumns();  // Set columns based on status
    console.log(this.selectedStep);
  }

  // Close the modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Set columns based on selected status
  setDisplayedColumns(): void {
    if (this.selectedStep.statut === 'Existant') {
      this.displayedColumns = [
        'region', 'province', 'communes', 'milieu', 'operateur', 'procede', 'capacite',
        'date_mise_en_service'
      ];
    } else if (this.selectedStep.statut === 'En cours') {
      this.displayedColumns = [
        'region', 'province', 'communes', 'milieu', 'operateur', 'procede', 'capacite',
        'cout', 'situation_travaux', 'etat_avancement'
      ];
    }
  }

  // Format communes array into a comma-separated string
  // formatCommunes(communes: any[]): string {
  //   return communes.map(commune => commune.nom).join(', ');
  // }

  // Print function (trigger print dialog)
  print(): void {
    window.print();
  }

  // Edit button handler (add your logic here)
  onEdit(): void {
    console.log('Edit clicked');
    // Add your edit logic here
  }

  // Delete button handler (add your logic here)
  onDelete(): void {
    // Proceed with the deletion if confirmed
    this.stepservice.deleteStep(this.selectedStep.id).subscribe(
      (response) => {
        console.log('Step supprimer avec success!', response);
        this.toastr.success('STEP supprimer avec success!', 'success');
        this.onNoClick();

      },
      (error) => {
        this.toastr.error('Error while deleting step:', "error");
        // Handle error if needed
      }
    );
  }
}
