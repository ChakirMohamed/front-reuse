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
status: number[], selectedYear: number, regionIds: number[], usageIds: number[], miFinancementIds: number[]  ): Observable<any> {
    // Initialize HttpParams
    let params = new HttpParams();

    // Dynamically append each parameter if they exist

    status.forEach(id=>{
      params = params.append('status[]', id.toString());
    })


    regionIds.forEach(id => {
      params = params.append('regionIds[]', id.toString());
    });

    usageIds.forEach(id => {
      params = params.append('usageIds[]', id.toString());
    });

    miFinancementIds.forEach(id => {
      params = params.append('miFinancementIds[]', id.toString());
    });

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
