import { Component, OnInit, Input } from '@angular/core';
import { StepService } from '../../../services/step.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { ProvinceService } from '../../../services/collectivites/province.service';
import { CommuneService } from '../../../services/collectivites/commune.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-step',
  templateUrl: './edit-step.component.html',
  styleUrls: ['./edit-step.component.scss'],
})
export class EditStepComponent implements OnInit {
  step: any = {};
  regions: any[] = [];
  provinces: any[] = [];
  communes: any[] = [];
  usages: any[] = [];
  years: number[] = [];

  encours: any ;
  etatAvancement: any[] = [];

  selectedRegion: number | null = null;
  selectedProvince: number | null = null;
  selectedCommune: number | null = null;

  @Input() stepId: any;

  constructor(
    private stepService: StepService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private communeService: CommuneService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.stepId = params.get('id')!;
      this.fetchStepData();
    });

    this.regionService.getAllRegions().subscribe((data) => (this.regions = data));
    this.stepService.getUsages().subscribe((data) => (this.usages = data));

    this.generateYears();
  }

  removeEtatAvancement(index: number) {
    this.etatAvancement.splice(index, 1);
  }
  removeCommune(commune) {
    this.step.communes = this.step.communes.filter((c) => c !== commune);
  }
  fetchStepData() {
    this.stepService.getStepById(this.stepId).subscribe(
      (data) => {
        this.step = data;
        this.selectedRegion = this.step.region.id;
        this.selectedProvince = this.step.province.id;

        this.encours = this.step.encours && this.step.encours.length > 0 ? this.step.encours[0] : {cout_step: null,situation_travaux: '',etat_avancement: []};
        this.etatAvancement = this.encours ? this.encours.etat_avancement : [];

        this.onRegionChange();
        this.onProvinceChange();
      },
      (error) => {
        this.toastr.error('Failed to fetch STEP data', 'Error');
      }
    );
  }
  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1965; year--) {
      this.years.push(year);
    }
  }
  addCommune() {
    if (this.selectedCommune) {
      const commune = this.communes.find((c) => c.id === this.selectedCommune);
      this.step.communes.push(commune);
      //this.onRegionChange();
    }
  }

  onReutilisationChange() {
    if (this.step.reutilise == 0) {
      this.step.usage_id = null;
      this.step.volume_reutiliser = null;
    }
  }

  onRegionChange() {
    this.provinceService
      .getProvincesByRegionId(this.selectedRegion)
      .subscribe((data) => (this.provinces = data));
    this.communes = [];
  }

  onProvinceChange() {
    this.communes = [];
    this.communeService
      .getCommunesByProvinceId(this.selectedProvince)
      .subscribe((data) => (this.communes = data));
  }

  onSubmit() {
    console.log(this.step);

    if (this.step.statut === 'En cours') {
      if(!this.encours.cout_step || this.encours.cout_step<0){
        this.toastr.error('Cout de la STEP invalid', 'Error');
        return;
      }
      this.encours.etat_avancement = this.etatAvancement;
      this.step.encours = [this.encours]; // Ajoute l'en cours s'il est défini
    }

    if(this.step.communes.length<=0){this.toastr.error('Choisir les Communes de la STEP !', '');return}
    this.step.communesId = this.step.communes.map(commune => commune.id);
    if(this.step.operateur.trim()==""){this.toastr.error('Saisir operateur !', '');return}
    if(this.step.date_mise_en_service == "" ){this.step.date_mise_en_service=null;}

    // Ensure data integrity before sending to API
    if (this.step.reutilise == 0) {
      this.step.usage_id=null;
      this.step.volume_reutiliser=null;
    }




    this.stepService.updateStep(this.stepId,this.step).subscribe(
      (response) => {
        this.toastr.success('STEP modifier avec success!', 'Success');
      },
      (error) => {
        this.toastr.error('Failed to update STEP.', 'Error');
      }
    );
  }
}
