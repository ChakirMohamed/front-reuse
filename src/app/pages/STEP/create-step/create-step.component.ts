import { Component, OnInit } from '@angular/core';
import { StepService } from '../../../services/step.service'
import {  CommuneService } from '../../../services/collectivites/commune.service';
import { RegionService } from '../../../services/collectivites/region.service';
import { ProvinceService,} from '../../../services/collectivites/province.service';
import { ToastrService } from 'ngx-toastr';
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
    reutilise: 0, // Default: Non réutilisée
    volume_reutiliser: null,
    usage_id: null,
    date_mise_en_service: "",

  };
  encours: any = {
    cout_step: null,
    situation_travaux: '',
    etat_avancement: [],
  };
  etatAvancement: any[] = [];

  regions: any[] = [];
  provinces: any[] = [];
  communes: any[] = [];
  usages: any[] = [];

  selectedRegion: number | null = null;
  selectedProvince: number | null = null;
  selectedCommune: number | null = null;

  years: number[] = [];

  constructor(
    private stepService: StepService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private communeService: CommuneService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.regionService.getAllRegions().subscribe((data) => (this.regions = data));
    this.stepService.getUsages().subscribe((data) => (this.usages = data));
    this.generateYears();
  }
  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1965 ; year--) {
      this.years.push(year);
    }

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
      //this.onRegionChange();
    }
  }

  removeCommune(commune) {
    this.step.communes = this.step.communes.filter((c) => c !== commune);
  }

  // addEncours() {
  //   this.step.encours.push({ cout_step: 0, situation_travaux: '' });
  // }
  addEtatAvancement() {
    this.etatAvancement.push({ annee: null, pourcentage: null });
  }

  removeEtatAvancement(index: number) {
    this.etatAvancement.splice(index, 1);
  }

  removeEncours(index: number) {
    this.step.encours.splice(index, 1);
  }
  onReutilisationChange() {
    if (this.step.reutilise == 0) {
      this.step.usage_id = null;
      this.step.volume_reutiliser = null;
    }
  }

  resetForm() {
    // Reset the model to the initial state
    this.step = {
      statut: 'Existant',
      milieu: '',
      operateur: '',
      procede: '',
      capacite: '',
      communes: [],
      reutilise: 0,
      volume_reutiliser: null,
      usage_id: null,
    };
    this.selectedRegion=null;
    this.selectedProvince=null;
    this.selectedCommune = null;

    this.encours = {
      cout_step: null,
      situation_travaux: '',
      etat_avancement: [],
    };

    this.etatAvancement = [];

    // Reset the form control states
    //stepForm.reset();
  }


  onSubmit() {

    if (this.step.statut === 'En cours') {
      this.encours.etat_avancement = this.etatAvancement;
      this.step.encours = [this.encours]; // Ajoute l'en cours s'il est défini
    }
    // Ensure data integrity before sending to API
    if (this.step.reutilise == 0) {
       this.step.usage_id=null;
       this.step.volume_reutiliser=null;
    }
    // console.log(this.step);
    // console.log(this.step.communes);
    // console.log(typeof( this.step.commune));
    if(this.step.communes.length<=0){this.toastr.error('Choisir les Communes de la STEP !', '');return}
    this.step.communesId = this.step.communes.map(commune => commune.id);
    if(this.step.operateur.trim()==""){this.toastr.error('Saisir operateur !', '');return}
    if(this.step.date_mise_en_service == "" ){this.step.date_mise_en_service=null;}
    console.log(this.step)

    this.stepService.createStep(this.step).subscribe(
      (response) => {
        console.log('STEP créé avec succès !', response);
        // Show a success toast
        this.toastr.success('Step created successfully!', 'Success');
        this.resetForm();
      },
      (error) => {
        console.error('Error while creating step:', error);
        // Show an error toast
        this.toastr.error('Failed to create step.', 'Error');
      }
    );
    // this.stepService.createStep(this.step).subscribe((response) => {
    //   console.log('STEP créé avec succès !', response);
    // });
  }
}
