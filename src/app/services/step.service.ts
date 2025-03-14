import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private readonly basePath = 'steps';

  constructor(private apiService: ApiService) {}

  /**
   * Get all STEPs with all associated data
   */
  getAllSteps(): Observable<any> {
    return this.apiService.get(`${this.basePath}`);
  }

  /**
   * Get STEPs by status (Existant or En cours)
   * @param status The status of the STEP (Existant/En cours)
   */
  getStepsByStatus(status: string): Observable<any> {
    return this.apiService.get(`${this.basePath}/${status}`);
  }

  /**
   * Get a single STEP by its ID
   * @param id The ID of the STEP
   */
  getStepById(id: number): Observable<any> {
    return this.apiService.get(`${this.basePath}/${id}`);
  }

  /**
   * Create a new STEP with all associated data
   * @param step The STEP data to create
   */
  createStep(step: any): Observable<any> {
    return this.apiService.post(`${this.basePath}`, step);
  }

  /**
   * Update an existing STEP with all associated data
   * @param id The ID of the STEP to update
   * @param step The updated STEP data
   */
  updateStep(id: number, step: any): Observable<any> {
    return this.apiService.put(`${this.basePath}/${id}`, step);
  }

  /**
   * Delete a STEP by its ID
   * @param id The ID of the STEP to delete
   */
  deleteStep(id: number): Observable<any> {
    const confirmDelete = confirm('voulez vous vraiment supprimer step ?');

    if (confirmDelete) {
      // Proceed with the deletion if confirmed
      return this.apiService.delete(`${this.basePath}/${id}`);

    } else {
      console.log('Deletion canceled');
    }
  }



  /**
   * Get all usages (for usage dropdown)
   */
  getUsages(): Observable<any> {
    return this.apiService.get('usages');
  }

  /**
   * Get STEPs by status and region
   * @param status The status of the STEP (Existant/En cours)
   * @param regionId The ID of the region to filter by
   */
  getStepsByStatusAndRegion(status: string, regionId: number | null): Observable<any> {
    // Build query parameters to send with the request
    let url = `${this.basePath}filter?status=${status}`;
    if (regionId !== null) {
      url += `&regionId=${regionId}`;
    }
    return this.apiService.get(url);
  }
}
