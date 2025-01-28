import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectivitesService {
  private baseUrl = environment.apiBaseUrl; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch the hierarchical data
  getCollectivites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/collectivites`);
  }

  // Add a new Region
  addRegion(region: { nom: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/regions`, region);
  }

  // Add a new Province
  addProvince(province: { nom: string; id_region: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/provinces`, province);
  }

  // Add a new Commune
  addCommune(commune: { nom: string; id_province: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/communes`, commune);
  }
}
