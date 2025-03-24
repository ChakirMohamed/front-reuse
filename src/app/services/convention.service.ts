import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {

  constructor(private apiService: ApiService) { }

  // Fetch all conventions with optional filters


  // Fetch all conventions with multiple filters
  getFilteredConventions(
    status: number[], // Array of selected status
    regionIds: number[], // Array of selected region IDs
    usageIds: number[], // Array of selected usage IDs
    miFinancementIds: number[] // Array of selected mi-financement IDs
  ): Observable<any> {
    // Initialize HttpParams
    let params = new HttpParams();

    // Dynamically append each parameter if they exist
    if (status.length) {
      params = params.append('status', status.join(','));
    }

    if (regionIds.length) {
      params = params.append('regionIds', regionIds.join(','));
    }

    if (usageIds.length) {
      params = params.append('usageIds', usageIds.join(','));
    }

    if (miFinancementIds.length) {
      params = params.append('miFinancementIds', miFinancementIds.join(','));
    }

    // Call API to get filtered conventions
    return this.apiService.get<any>('conventions', params);
  }




  // Fetch convention by ID
  getConventionById(id: number): Observable<any> {
    return this.apiService.get<any>(`conventions/${id}`);
  }

  // Create a new convention
  createConvention(conventionData: any): Observable<any> {
    return this.apiService.post<any>('conventions', conventionData);
  }

  // Update an existing convention
  updateConvention(id: number, conventionData: any): Observable<any> {
    return this.apiService.put<any>(`conventions/${id}`, conventionData);
  }

  // Delete a convention
  deleteConvention(id: number): Observable<any> {
    return this.apiService.delete<any>(`conventions/${id}`);
  }
  getAllStatuses(){
    return this.apiService.get<any>(`status-convention`);
  }
}
