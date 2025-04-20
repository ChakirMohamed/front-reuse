import { Component, OnInit } from '@angular/core';
import { ConventionService } from '../../../services/convention.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { UsageService } from '../../../services/usage.service';
import { MiFinancementService } from '../../../services/mi-financement.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-conventions',
  templateUrl: './list-conventions.component.html',
  styleUrls: ['./list-conventions.component.scss']
})
export class ListConventionsComponent implements OnInit {
  selectedStatus: number[] = [];
  selectedRegion: number[] = [];
  selectedUsage: number[] = [];
  selectedMiFinancement: number[] = [];
  selectedYear: number | null = null;

  regions: any[] = [];
  usages: any[] = [];
  miFinancements: any[] = [];
  conventions: any[] = [];
  statuses: any[] = [];

  displayedColumns: string[] = [
    'region', 'province', 'communes', 'titre', 'montant_total',
    'mi_financement', 'autre_financement', 'usages', 'date_signature', 'actions'
  ];

  constructor(
    private conventionService: ConventionService,
    private regionService: RegionService,
    private usageService: UsageService,
    private miFinancementService: MiFinancementService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRegions();
    this.loadUsages();
    this.loadMiFinancements();
    this.loadStatuses();
    this.loadConventions();
  }
  viewConvention(id: number): void {
    this.router.navigate(['/conventions', id]);
  }

  loadRegions() {
    this.regionService.getAllRegions().subscribe(
      (data) => this.regions = data,
      (error) => this.toastr.error('Failed to load regions', 'Error')
    );
  }

  loadUsages() {
    this.usageService.getAllUsages().subscribe(
      (data) => this.usages = data,
      (error) => this.toastr.error('Failed to load usages', 'Error')
    );
  }

  loadMiFinancements() {
    this.miFinancementService.getAllMiFinancements().subscribe(
      (data) => this.miFinancements = data,
      (error) => this.toastr.error('Failed to load mi-financements', 'Error')
    );
  }

  loadStatuses() {
    this.conventionService.getAllStatuses().subscribe(
      (data) => this.statuses = data,
      (error) => this.toastr.error('Failed to load statuses', 'Error')
    );
  }

  loadConventions() {
    this.conventionService.getFilteredConventions(
      this.selectedStatus,
      this.selectedYear,
      this.selectedRegion,
      this.selectedUsage,
      this.selectedMiFinancement
    ).subscribe(
      (data) => {
        this.conventions = data;
        console.log('Loaded conventions:', this.conventions);
      },
      (error) => {
        this.toastr.error('Failed to load conventions', 'Error');
        console.error('Error loading conventions:', error);
      }
    );
  }

  onStatusChange() {
    this.loadConventions();
  }

  onRegionChange() {
    this.loadConventions();
  }

  onUsageChange() {
    this.loadConventions();
  }

  onMiFinancementChange() {
    this.loadConventions();
  }

  onYearChange() {
    this.toastr.error('filter year disabled', 'Error');
    //this.loadConventions();
  }

  clearFilters() {
    this.selectedStatus = [];
    this.selectedRegion = [];
    this.selectedUsage = [];
    this.selectedMiFinancement = [];
    this.selectedYear = null;
    this.loadConventions();
  }

  deleteConvention(convention: any) {
    this.conventionService.deleteConvention(convention.id).subscribe(
      (response) => {
        this.toastr.success('Convention deleted successfully', 'Success');
        this.loadConventions();
      },
      (error) => {
        this.toastr.error('Error while deleting convention', 'Error');
      }
    );
  }
}
