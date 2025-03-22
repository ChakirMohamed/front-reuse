import { Component, OnInit} from '@angular/core';
import { StepService } from '../../../services/step.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { StepShowModalComponent } from '../step-show-modal/step-show-modal/step-show-modal.component';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: "app-list-steps",
  templateUrl: "./list-steps.component.html",
  styleUrls: ["./list-steps.component.scss"],
})
export class ListStepsComponent implements OnInit {
  selectedStatus: string = "Existant";
  selectedRegion: number | null = null;

  regions: any[] = []; // Holds all regions
  steps: any[] = []; // Holds filtered steps
  displayedColumns: string[] = []; // Holds column names to display
  communesjoin: any = "";
  constructor(
    private stepService: StepService,
    private regionService: RegionService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

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
        this.toastr.error("Failed to load regions", "Error");
      }
    );
  }

  loadSteps() {
    const regionId = this.selectedRegion ? this.selectedRegion : null;
    this.stepService
      .getStepsByStatusAndRegion(this.selectedStatus, regionId)
      .subscribe(
        (data) => {
          this.steps = data.map((step) => {
            // Check if communes is an array of objects and join the 'nom' property
            if (Array.isArray(step.communes)) {
              step.communes = step.communes
                .map((commune) => commune.nom)
                .join(", "); // Join 'nom' property
            }
            return step;
          });
          console.log(this.steps); // Check the updated steps with joined 'nom' values
        },
        (error) => {
          this.toastr.error("Failed to load steps", "Error");
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
    if (this.selectedStatus === "Existant") {
      this.displayedColumns = [
        "region",
        "province",
        "communes",
        "milieu",
        "operateur",
        "procede",
        "capacite",
        "date_mise_en_service",
        "actions",
      ];
    } else if (this.selectedStatus === "En cours") {
      this.displayedColumns = [
        "region",
        "province",
        "communes",
        "milieu",
        "operateur",
        "procede",
        "capacite",
        "cout",
        "situation_travaux",
        "etat_avancement",
        "actions",
      ];
    }
  }

  //show modal
  openShowModal(step: any): void {
    const dialogRef = this.dialog.open(StepShowModalComponent, {
      width: "80%", // Modal width
      data: { step },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadSteps();
    });
  }
  updateStep(step: any) {
    this.router.navigate(["/edit-step", step.id]);
  }

  deleteStep(step: any) {
    // Proceed with the deletion if confirmed
    this.stepService.deleteStep(step.id).subscribe(
      (response) => {
        console.log("Step supprimer avec success!", response);
        this.toastr.success("STEP supprimer avec success!", "success");
        this.loadSteps();
      },
      (error) => {
        this.toastr.error("Error while deleting step:", "error");
        // Handle error if needed
      }
    );
  }






  downloadXLSX() {
    // Define headers based on the selected status
    let headers: string[] = [];

    if (this.selectedStatus === 'Existant') {
      headers = [
        'Région', 'Province', 'Communes', 'Milieu', 'Operateur', 'Procédé', 'Capacité', 'Date Mise En Service'
      ];
    } else if (this.selectedStatus === 'En cours') {
      headers = [
        'Région', 'Province', 'Communes', 'Milieu', 'Operateur', 'Procédé', 'Capacité', 'Date Mise En Service',
        'Coût STEP', 'Situation des Travaux', 'État d\'Avancement'
      ];
    }

    // Prepare the data for each row, dynamically changing depending on the selected status
    const data = this.steps.map((step) => {

      const etatAvancement = step.encours?.[0]?.etat_avancement.map(avancement => `${avancement.annee}: ${avancement.pourcentage}%`).join(', ') || '';

      // Generate the row data
      const rowData = [
        step.region_nom,
        step.province_nom,
        step.communes,
        step.milieu,
        step.operateur,
        step.procede,
        step.capacite,
        step.date_mise_en_service || '-',
      ];

      if (this.selectedStatus === 'En cours') {
        rowData.push(
          step.encours?.[0]?.cout_step || '-',
          step.encours?.[0]?.situation_travaux || '-',
          etatAvancement
        );
      }

      return rowData;
    });

    // Create the worksheet with the data and headers
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

    // Add cell borders
    const range = XLSX.utils.decode_range(ws['!ref']); // Get the range of the sheet
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const address = { r: row, c: col };
        const cell_ref = XLSX.utils.encode_cell(address);

        // Apply borders to each cell
        if (!ws[cell_ref]) ws[cell_ref] = {}; // Make sure the cell exists
        ws[cell_ref].s = {
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          }
        };
      }
    }

    // Create the workbook and append the sheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'STEPs '+this.selectedStatus);

    // Write the Excel file to the browser
    XLSX.writeFile(wb, 'steps_data.xlsx');
  }


}
