import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';  // Import ApiService

@Injectable({
  providedIn: 'root'
})
export class UsageService {

  constructor(private apiService: ApiService) { }

  // Fetch all usages
  getAllUsages(): Observable<any> {
    return this.apiService.get<any>('usages');
  }

  // Fetch usage by ID
  getUsageById(id: number): Observable<any> {
    return this.apiService.get<any>(`usages/${id}`);
  }

  // Create a new usage
  createUsage(usageData: any): Observable<any> {
    return this.apiService.post<any>('usages', usageData);
  }

  // Update an existing usage
  updateUsage(id: number, usageData: any): Observable<any> {
    return this.apiService.put<any>(`usages/${id}`, usageData);
  }

  // Delete a usage
  deleteUsage(id: number): Observable<any> {
    return this.apiService.delete<any>(`usages/${id}`);
  }
}
