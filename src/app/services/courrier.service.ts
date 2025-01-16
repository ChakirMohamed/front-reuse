import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourrierService {
  constructor(private apiService: ApiService) {}

  getAllCourriers(): Observable<any> {
    return this.apiService.get('courriers');
  }

  getCourrierById(id: number): Observable<any> {
    return this.apiService.get(`courriers/${id}`);
  }

  getTypes(): Observable<any> {
    // Uncomment this line if you are using a service to fetch types from an API.
    // return this.apiService.get('types-courrier');
    console.log('getTypes()');

    const children: any[] = [
      { path: '/courriers/conventions', title: 'Conventions', icon: '', class: '' },
      { path: '/courriers/demande-appui', title: 'Demande d\'appui', icon: '', class: '' },
      { path: '/courriers/autre', title: 'Autre', icon: '', class: '' },
    ];

    // The corrected variable name to return is `children`, not `Children`.
    return of(children); // `of` is used to create an Observable from the array.
}


  createCourrier(courrier: any): Observable<any> {
    return this.apiService.post('courriers', courrier);
  }

  updateCourrier(id: number, courrier: any): Observable<any> {
    return this.apiService.put(`courriers/${id}`, courrier);
  }

  deleteCourrier(id: number): Observable<any> {
    return this.apiService.delete(`courriers/${id}`);
  }
}
