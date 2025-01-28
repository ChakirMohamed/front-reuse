import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private readonly basePath = '/steps';

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
    return this.apiService.delete(`${this.basePath}/${id}`);
  }

  /**
   * Get all usages (for usage dropdown)
   */
  getUsages(): Observable<any> {
    return this.apiService.get('usages');
  }
}
