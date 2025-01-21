import { Component, OnInit } from '@angular/core';
import { CourrierService } from 'app/services/courrier.service';

@Component({
  selector: 'app-create-courrier',
  templateUrl: './create-courrier.component.html',
  styleUrls: ['./create-courrier.component.scss'],
})
export class CreateCourrierComponent implements OnInit {
  courrier: any = {
    num_envoi: '',
    titre: '',
    cout: 0,
    date_reception: '',
    expediteur: '',
    id_type: null,
    id_status: null,
    usages: [],
    mi_financements: [],
    autre_financements: [],
    communes: [],
  };

  types: any[] = [];
  statuses: any[] = [];
  usages: any[] = [];
  regions: any[] = [];
  filteredProvinces: any[] = [];
  filteredCommunes: any[] = [];
  selectedCommunes: any[] = [];

  miFinancements: any[] = [];
  addedMiFinancements: any[] = [];
  montantMiFinancement: number = 0;
  selectedMiFinancement: any = null;

  addedAutreFinancements: any[] = [];
  titreAutreFinancement: string = '';
  montantAutreFinancement: number = 0;

  selectedRegion: any = null;
  selectedProvince: any = null;
  selectedCommune: any = null;


  selectedUsages: any[] = []; // Liste des usages sélectionnés
  newUsage: string = ''; // Permet d'ajouter un usage non existant

  constructor(private courrierService: CourrierService) {}

  ngOnInit(): void {
    // Fetch dropdown data from API
    this.courrierService.getAllTypes().subscribe((data: any) => (this.types = data));
    this.courrierService.getAllStatuses().subscribe((data: any) => (this.statuses = data));
    this.courrierService.getAllUsages().subscribe((data: any) => (this.usages = data));
    this.courrierService.getAllRegions().subscribe((data: any) => (this.regions = data));
    this.courrierService.getAllMiFinancements().subscribe((data: any) => (this.miFinancements = data));
    this.fetchUsages();
  }

  /* usage */
  fetchUsages(): void {
    this.courrierService.getAllUsages().subscribe(
      (data) => {
        this.usages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des usages', error);
      }
    );
  }
  addUsageToList(usage: any): void {
    if (!this.selectedUsages.find((u) => u.id === usage.id)) {
      this.selectedUsages.push(usage);
    }
  }

  removeUsageFromList(index: number): void {
    this.selectedUsages.splice(index, 1);
  }

  addCustomUsage(): void {
    if (this.newUsage.trim()) {
      const customUsage = { id: null, nom: this.newUsage }; // `id: null` pour usage non existant dans la base
      this.selectedUsages.push(customUsage);
      this.newUsage = '';
    }
  }
  /******************************************** */

  onRegionChange(): void {
    if (this.selectedRegion) {
      this.courrierService
        .getProvincesByRegionId(this.selectedRegion)
        .subscribe((data: any) => (this.filteredProvinces = data));
      this.filteredCommunes = []; // Reset communes when region changes
    }
  }

  onProvinceChange(): void {
    if (this.selectedProvince) {
      this.courrierService
        .getCommunesByProvinceId(this.selectedProvince)
        .subscribe((data: any) => (this.filteredCommunes = data));
    }
  }

  addCommune(): void {
    if (this.selectedCommune) {
      const commune = this.filteredCommunes.find((c) => c.id === this.selectedCommune);
      if (commune && !this.selectedCommunes.some((c) => c.id === commune.id)) {
        this.selectedCommunes.push(commune);
      }
    }
  }

  removeCommune(commune: any): void {
    this.selectedCommunes = this.selectedCommunes.filter((c) => c.id !== commune.id);
  }

  addMiFinancement(): void {
    if (this.selectedMiFinancement && this.montantMiFinancement > 0) {
      const mi = this.miFinancements.find((f) => f.id === this.selectedMiFinancement);
      if (mi) {
        this.addedMiFinancements.push({
          nom: mi.nom,
          montant: this.montantMiFinancement,
        });
        this.selectedMiFinancement = null;
        this.montantMiFinancement = 0;
      }
    }
  }

  removeMiFinancement(financement: any): void {
    this.addedMiFinancements = this.addedMiFinancements.filter((f) => f !== financement);
  }

  addAutreFinancement(): void {
    if (this.titreAutreFinancement && this.montantAutreFinancement > 0) {
      this.addedAutreFinancements.push({
        titre: this.titreAutreFinancement,
        montant: this.montantAutreFinancement,
      });
      this.titreAutreFinancement = '';
      this.montantAutreFinancement = 0;
    }
  }

  removeAutreFinancement(financement: any): void {
    this.addedAutreFinancements = this.addedAutreFinancements.filter((f) => f !== financement);
  }

  submitCourrier(): void {
    this.courrier.communes = this.selectedCommunes.map((commune) => commune.id);
    this.courrier.mi_financements = this.addedMiFinancements;
    this.courrier.autre_financements = this.addedAutreFinancements;

    this.courrierService.createCourrier(this.courrier).subscribe(
      (response: any) => {
        console.log('Courrier créé avec succès:', response);
        // Reset the form or navigate to another page
        this.resetForm();
      },
      (error: any) => {
        console.error('Erreur lors de la création du courrier:', error);
      }
    );
  }

  resetForm(): void {
    this.courrier = {
      num_envoi: '',
      titre: '',
      cout: 0,
      date_reception: '',
      expediteur: '',
      id_type: null,
      id_status: null,
      usages: [],
      mi_financements: [],
      autre_financements: [],
      communes: [],
    };
    this.selectedCommunes = [];
    this.addedMiFinancements = [];
    this.addedAutreFinancements = [];
    this.selectedRegion = null;
    this.selectedProvince = null;
    this.selectedCommune = null;
  }
}
