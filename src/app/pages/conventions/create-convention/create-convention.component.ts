import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConventionService } from '../../../services/convention.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { ProvinceService } from '../../../services/collectivites/province.service';
import { CommuneService } from '../../../services/collectivites/commune.service';
import { MiFinancementService } from '../../../services/mi-financement.service';
import { UsageService } from '../../../services/usage.service';
//import { StatusService } from '../../../services/status.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-convention',
  templateUrl: './create-convention.component.html',
  styleUrls: ['./create-convention.component.scss']
})
export class CreateConventionComponent implements OnInit {
  convention: any = {
    titre: '',
    montant: null,
    date_signature: '',
    annee: new Date().getFullYear(),
    consistance: '',
    signe: 0,
    id_status: null,
    communes: [],
    usages: [],
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

  constructor(
    private conventionService: ConventionService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private communeService: CommuneService,
    private miFinancementService: MiFinancementService,
    private usageService: UsageService,

    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadReferenceData();
    this.generateYears();
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

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year);
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

  resetForm(): void {
    this.convention = {
      titre: '',
      montant: null,
      date_signature: '',
      annee: new Date().getFullYear(),
      consistance: '',
      signe: 0,
      id_status: null,
      communes: [],
      usages: [],
    };
    this.miFinancements = [];
    this.autreFinancements = [];
    this.selectedRegion = null;
    this.selectedProvince = null;
    this.selectedCommune = null;
  }

  onSubmit(): void {
    // Prepare payload
    const payload = {
      ...this.convention,
      mi_financements: this.miFinancements.filter(f => f.id_mi_financement && f.montant),
      autre_financements: this.autreFinancements.filter(f => f.titre && f.montant)
    };
    // console.log("payload",payload);
    // return;

    // Basic validation
    if (!payload.titre  || !payload.id_status ) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }

    // Submit to API
    this.conventionService.createConvention(payload).subscribe(
      (response) => {
        this.toastr.success('Convention créée avec succès', 'Succès');
        this.resetForm();
      },
      (error) => {
        console.error('Error creating convention:', error);
        this.toastr.error('Erreur lors de la création de la convention', 'Erreur');
      }
    );
  }
}
