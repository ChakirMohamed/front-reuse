import { Component, OnInit } from '@angular/core';
import { StepService } from '../../../services/step.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { StepShowModalComponent } from '../step-show-modal/step-show-modal/step-show-modal.component';

@Component({
  selector: 'app-list-steps',
  templateUrl: './list-steps.component.html',
  styleUrls: ['./list-steps.component.scss'],
})
export class ListStepsComponent implements OnInit {
  selectedStatus: string = 'Existant';
  selectedRegion: number | null = null;

  regions: any[] = []; // Holds all regions
  steps: any[] = []; // Holds filtered steps
  displayedColumns: string[] = []; // Holds column names to display

  constructor(private stepService: StepService, private regionService: RegionService, private toastr: ToastrService, public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.loadRegions();
    this.loadSteps();
  }

  loadRegions() {
    this.regionService.getAllRegions().subscribe(
      (data) => {
        this.regions = data;
      },
      (error) => {
        this.toastr.error('Failed to load regions', 'Error');
      }
    );
  }

  loadSteps() {
    const regionId = this.selectedRegion ? this.selectedRegion : null;
    this.stepService.getStepsByStatusAndRegion(this.selectedStatus, regionId).subscribe(
      (data) => {
        this.steps = data;
        console.log(this.steps);
      },
      (error) => {
        this.toastr.error('Failed to load steps', 'Error');
      }
    );

    // Set columns based on status
    this.updateDisplayedColumns();
  }

  onStatusChange() {
    this.loadSteps(); // Reload the steps when status changes
  }

  onRegionChange() {
    this.loadSteps(); // Reload the steps when region changes
  }

  // Dynamically set the displayed columns based on the selected status
  updateDisplayedColumns() {
    if (this.selectedStatus === 'Existant') {
      this.displayedColumns = [
        'region', 'province', 'communes', 'milieu', 'operateur', 'procede', 'capacite','actions'
      ];
    } else if (this.selectedStatus === 'En cours') {
      this.displayedColumns = [
        'region', 'province', 'communes', 'milieu', 'operateur', 'procede', 'capacite',
        'cout', 'situation_travaux', 'etat_avancement','actions'
      ];
    }
  }

  //show modal
  openShowModal(step: any): void {
    const dialogRef = this.dialog.open(StepShowModalComponent, {
      width: '80%', // Modal width
      data: { step }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
