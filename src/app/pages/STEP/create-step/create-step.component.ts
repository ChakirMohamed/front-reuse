import { Component, OnInit } from '@angular/core';
import { StepService } from '../../../services/step.service'
import {  CommuneService } from '../../../services/collectivites/commune.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { ProvinceService,} from '../../../services/collectivites/province.service';

@Component({
  selector: 'app-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.scss'],
})
export class CreateStepComponent implements OnInit {
  step: any = {
    statut: 'Existant',
    milieu: '',
    operateur: '',
    procede: '',
    capacite: '',
    communes: [],

  };
  encours: any = {
    cout_step: null,
    situation_travaux: '',
    etat_avancements: [],
  };
  etatAvancements: any[] = [];

  regions: any[] = [];
  provinces: any[] = [];
  communes: any[] = [];
  usages: any[] = [];

  selectedRegion: number | null = null;
  selectedProvince: number | null = null;
  selectedCommune: number | null = null;

  constructor(
    private stepService: StepService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private communeService: CommuneService
  ) {}

  ngOnInit() {
    this.regionService.getAllRegions().subscribe((data) => (this.regions = data));
    this.stepService.getUsages().subscribe((data) => (this.usages = data));
  }

  onRegionChange() {
    this.provinceService
      .getProvincesByRegionId(this.selectedRegion)
      .subscribe((data) => (this.provinces = data));
    this.communes = [];
  }

  onProvinceChange() {
    this.communeService
      .getCommunesByProvinceId(this.selectedProvince)
      .subscribe((data) => (this.communes = data));
      console.log(this.communes);
  }

  addCommune() {
    if (this.selectedCommune) {
      const commune = this.communes.find((c) => c.id === this.selectedCommune);
      this.step.communes.push(commune);
      this.onRegionChange();
    }
  }

  removeCommune(commune) {
    this.step.communes = this.step.communes.filter((c) => c !== commune);
  }

  // addEncours() {
  //   this.step.encours.push({ cout_step: 0, situation_travaux: '' });
  // }
  addEtatAvancement() {
    this.etatAvancements.push({ annee: null, pourcentage: null });
  }

  removeEtatAvancement(index: number) {
    this.etatAvancements.splice(index, 1);
  }

  removeEncours(index: number) {
    this.step.encours.splice(index, 1);
  }

  onSubmit() {
    console.log(this.step);
    return;
    if (this.step.statut === 'En cours') {
      this.encours.etat_avancements = this.etatAvancements;
      this.step.encours = this.encours; // Ajoute l'en cours s'il est défini
    }
    this.stepService.createStep(this.step).subscribe((response) => {
      console.log('STEP créé avec succès !', response);
    });
  }
}
