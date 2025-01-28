import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommuneService {
  constructor(private apiService: ApiService) {}

  /**
   * Fetch all communes
   */
  getAllCommunes(): Observable<any[]> {
    return this.apiService.get('communes');
  }

  /**
   * Fetch communes by province ID
   * @param provinceId Province ID
   */
  getCommunesByProvinceId(provinceId: number): Observable<any[]> {
    return this.apiService.get(`provinces/${provinceId}/communes`);
  }
}
