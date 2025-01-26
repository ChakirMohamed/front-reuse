import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  constructor(private apiService: ApiService) {}

  /**
   * Fetch all provinces
   */
  getAllProvinces(): Observable<any[]> {
    return this.apiService.get('/provinces');
  }

  /**
   * Fetch provinces by region ID
   * @param regionId Region ID
   */
  getProvincesByRegionId(regionId: number): Observable<any[]> {
    return this.apiService.get(`/regions/${regionId}/provinces`);
  }
}

