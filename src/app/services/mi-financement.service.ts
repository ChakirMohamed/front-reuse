import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MiFinancementService {

  constructor(private apiService: ApiService) { }

  // Fetch all mi-financements
  getAllMiFinancements(): Observable<any> {
    return this.apiService.get<any>('mi-financement');
  }

  // Fetch mi-financement by ID
  getMiFinancementById(id: number): Observable<any> {
    return this.apiService.get<any>(`mi-financement/${id}`);
  }

  // Create a new mi-financement
  createMiFinancement(miFinancementData: any): Observable<any> {
    return this.apiService.post<any>('mi-financement', miFinancementData);
  }

  // Update an existing mi-financement
  updateMiFinancement(id: number, miFinancementData: any): Observable<any> {
    return this.apiService.put<any>(`mi-financement/${id}`, miFinancementData);
  }

  // Delete a mi-financement
  deleteMiFinancement(id: number): Observable<any> {
    return this.apiService.delete<any>(`mi-financement/${id}`);
  }
}
