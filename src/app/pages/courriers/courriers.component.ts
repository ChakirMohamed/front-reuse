
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourrierService } from 'app/services/courrier.service';

@Component({
  selector: 'app-courriers',
  templateUrl: './courriers.component.html',
  styleUrls: ['./courriers.component.scss']
})
export class CourriersComponent implements OnInit {
  public courriers: any[] = [];
  public typeNom: string = '';

  constructor(
    private route: ActivatedRoute,
    private courrierService: CourrierService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe((params) => {
      this.typeNom = params.get('nom') || '';
      if (this.typeNom) {
        this.fetchCourriersByType(this.typeNom);
      }
    });
  }

  fetchCourriersByType(typeName: string): void {
    this.courrierService.getCourriersByTypeName(typeName).subscribe(
      (data: any[]) => {
        console.log(`Fetched courriers for type ${typeName}:`, data);
        this.courriers = data;
      },
      (error) => {
        console.error('Error fetching courriers by type:', error);
      }
    );
  }
}

/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourrierService } from '../../services/courrier.service';

@Component({
  selector: 'app',
  templateUrl: './courriers.component.html',
  styleUrls: ['./courriers.component.scss']
})
export class CourriersComponent  implements OnInit {
  public courriers: any[] = []; // Store courriers
  public typeNom: string = ''; // Store type name for display

  constructor(
    private route: ActivatedRoute,
    private courrierService: CourrierService
  ) {}

  ngOnInit(): void {
    this.typeNom = this.route.snapshot.paramMap.get('nom') || '';
    if (this.typeNom) {
      this.fetchCourriersByType(this.typeNom);
    }
  }

  fetchCourriersByType(typeName: string): void {
    this.courrierService.getCourriersByTypeName(typeName).subscribe(
      (data: any[]) => {
        console.log(`Fetched courriers for type ${typeName}:`, data);
        this.courriers = data;
      },
      (error) => {
        console.error('Error fetching courriers by type:', error);
      }
    );
  }
}
/*/
