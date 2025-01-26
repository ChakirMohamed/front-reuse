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
    capacite: 0,
    communes: [],
    encours: [],
  };

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
  }

  addCommune() {
    if (this.selectedCommune) {
      const commune = this.communes.find((c) => c.id === this.selectedCommune);
      this.step.communes.push(commune);
    }
  }

  removeCommune(commune) {
    this.step.communes = this.step.communes.filter((c) => c !== commune);
  }

  addEncours() {
    this.step.encours.push({ cout_step: 0, situation_travaux: '' });
  }

  removeEncours(index: number) {
    this.step.encours.splice(index, 1);
  }

  onSubmit() {
    this.stepService.createStep(this.step).subscribe((response) => {
      console.log('STEP créé avec succès !', response);
    });
  }
}
