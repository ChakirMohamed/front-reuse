import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private apiService: ApiService) {}

  /**
   * Fetch all regions
   */
  getAllRegions(): Observable<any[]> {
    return this.apiService.get('/regions');
  }

  /**
   * Fetch a region by ID
   * @param id Region ID
   */
  getRegionById(id: number): Observable<any> {
    return this.apiService.get(`/regions/${id}`);
  }
}
