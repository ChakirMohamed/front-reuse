import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConventionService } from '../../../services/convention.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { ProvinceService } from '../../../services/collectivites/province.service';
import { CommuneService } from '../../../services/collectivites/commune.service';
import { MiFinancementService } from '../../../services/mi-financement.service';
import { UsageService } from '../../../services/usage.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-convention',
  templateUrl: './edit-convention.component.html',
  styleUrls: ['./edit-convention.component.scss']
})
export class EditConventionComponent implements OnInit {
  convention: any = {
    id: null,
    titre: '',
    annee: new Date().getFullYear(),
    consistance: '',
    signe: 0,
    id_status: null,
    communes: [],
    usages: [],
    mi_financements: [],
    autre_financements: []
  };

  miFinancements: any[] = [];
  autreFinancements: any[] = [];

  // Selection data
  regions: any[] = [];
  provinces: any[] = [];
  communes: any[] = [];
  allCommunes: any[] = [];
  selectedRegion: number | null = null;
  selectedProvince: number | null = null;
  selectedCommune: number | null = null;

  // Reference data
  statuses: any[] = [];
  miFinancementTypes: any[] = [];
  usageTypes: any[] = [];
  years: number[] = [];

  isSubmitting = false;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conventionService: ConventionService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private communeService: CommuneService,
    private miFinancementService: MiFinancementService,
    private usageService: UsageService,
    private snackBar: MatSnackBar
  ) {
    // Generate years for the dropdown
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.loadReferenceData();

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadConvention(id);
      } else {
        this.snackBar.open('ID de convention non fourni', 'Fermer', { duration: 3000 });
        this.router.navigate(['/conventions']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadReferenceData(): void {
    // Load regions
    this.regionService.getAllRegions().subscribe(data => this.regions = data);

    // Load statuses
    this.conventionService.getAllStatuses().subscribe(data => this.statuses = data);

    // Load MI financement types
    this.miFinancementService.getAllMiFinancements().subscribe(data => this.miFinancementTypes = data);

    // Load usage types
    this.usageService.getAllUsages().subscribe(data => this.usageTypes = data);

    // Load all communes for name lookup
    this.communeService.getAllCommunes().subscribe(data => this.allCommunes = data);
  }

  loadConvention(id: string): void {
    this.isLoading = true;
    this.conventionService.getConventionById(Number(id)).subscribe({
      next: (data) => {
        this.convention = data;
        this.miFinancements = [...data.mi_financements];
        this.autreFinancements = [...data.autre_financements];

        // Set initial region/province if communes exist
        if (data.communes?.length) {
          this.setInitialLocationSelections();
        }

        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Erreur lors du chargement de la convention', 'Fermer', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/conventions']);
      }
    });
  }

  setInitialLocationSelections(): void {
    const firstCommuneId = this.convention.communes[0];
    const commune = this.allCommunes.find(c => c.id === firstCommuneId);

    if (commune) {
      this.selectedRegion = commune.region_id;
      this.onRegionChange();

      setTimeout(() => {
        this.selectedProvince = commune.province_id;
        this.onProvinceChange();
      }, 100);
    }
  }

  onRegionChange(): void {
    this.provinces = [];
    this.communes = [];
    this.selectedProvince = null;
    this.selectedCommune = null;

    if (this.selectedRegion) {
      this.provinceService.getProvincesByRegionId(this.selectedRegion)
        .subscribe(data => this.provinces = data);
    }
  }

  onProvinceChange(): void {
    this.communes = [];
    this.selectedCommune = null;

    if (this.selectedProvince) {
      this.communeService.getCommunesByProvinceId(this.selectedProvince)
        .subscribe(data => this.communes = data);
    }
  }

  addCommune(): void {
    if (this.selectedCommune && !this.convention.communes.includes(this.selectedCommune)) {
      this.convention.communes.push(this.selectedCommune);
      this.selectedCommune = null;
    }
  }

  removeCommune(communeId: number): void {
    this.convention.communes = this.convention.communes.filter((id: number) => id !== communeId);
  }

  getCommuneName(communeId: number): string {
    const commune = this.allCommunes.find(c => c.id === communeId);
    return commune ? commune.nom : 'Commune inconnue';
  }

  getStatusName(statusId: number): string {
    const status = this.statuses.find(s => s.id === statusId);
    return status ? status.nom : 'Statut inconnu';
  }

  // Financement methods
  addMiFinancement(): void {
    this.miFinancements.push({ id_mi_financement: null, montant: null });
  }

  removeMiFinancement(index: number): void {
    this.miFinancements.splice(index, 1);
  }

  addAutreFinancement(): void {
    this.autreFinancements.push({ titre: '', montant: null });
  }

  removeAutreFinancement(index: number): void {
    this.autreFinancements.splice(index, 1);
  }

  // Usage methods
  addUsage(): void {
    this.convention.usages.push({ id_usage: null, libelle: '' });
  }

  removeUsage(index: number): void {
    this.convention.usages.splice(index, 1);
  }

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    // Prepare payload
    const payload = {
      ...this.convention,
      mi_financements: this.miFinancements.filter(f => f.id_mi_financement && f.montant),
      autre_financements: this.autreFinancements.filter(f => f.titre && f.montant)
    };

    // this.conventionService.updateConvention(payload).subscribe({
    //   next: () => {
    //     this.snackBar.open('Convention mise à jour avec succès', 'Fermer', { duration: 3000 });
    //     this.router.navigate(['/conventions', this.convention.id]);
    //   },
    //   error: (err) => {
    //     console.error('Error updating convention:', err);
    //     this.snackBar.open('Erreur lors de la mise à jour de la convention', 'Fermer', { duration: 3000 });
    //     this.isSubmitting = false;
    //   }
    // });
  }

  cancel(): void {
    if (this.convention.id) {
      this.router.navigate(['/conventions', this.convention.id]);
    } else {
      this.router.navigate(['/conventions']);
    }
  }
}
