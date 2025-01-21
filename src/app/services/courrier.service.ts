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

  getCourriersByTypeName(nom: string): Observable<any> {
    return this.apiService.get(`courriers/filter/type/${nom}`);
  }


  getTypes(): Observable<any> {
    // Uncomment this line if you are using a service to fetch types from an API.
    return this.apiService.get('types-courrier');

}


  // createCourrier(courrier: any): Observable<any> {
  //   return this.apiService.post('courriers', courrier);
  // }

  updateCourrier(id: number, courrier: any): Observable<any> {
    return this.apiService.put(`courriers/${id}`, courrier);
  }

  deleteCourrier(id: number): Observable<any> {
    return this.apiService.delete(`courriers/${id}`);
  }

  // getRegions(): Observable<any> {
  //   // Uncomment this line if you are using a service to fetch types from an API.
  //   return this.apiService.get('regions');
  // }
  // getProvinces(): Observable<any> {
  //   // Uncomment this line if you are using a service to fetch types from an API.
  //   return this.apiService.get('provinces');
  // }
  // getCommunes(): Observable<any> {
  //   // Uncomment this line if you are using a service to fetch types from an API.
  //   return this.apiService.get('communes');
  // }

  getProvincesOfRegion(idRegion:number): Observable<any> {
    // Uncomment this line if you are using a service to fetch types from an API.
    return this.apiService.get(`regions/${idRegion}/provinces`);
  }


  getRegions(): Observable<any> {
    return this.apiService.get('regions');
  }

  getProvinces(regionId: number): Observable<any> {
    return this.apiService.get(`regions/${regionId}/provinces`);
  }

  getCommunes(provinceId: number): Observable<any> {
    return this.apiService.get(`provinces/${provinceId}/communes`);
  }

  getMiFinancements(): Observable<any> {
    return this.apiService.get('mi-financement');
  }

  createCourrier(data: any): Observable<any> {
    return this.apiService.post('courriers', data);
  }



  getAllTypes(): Observable<any> {
    return this.apiService.get('types-courrier');
  }

  getAllStatuses(): Observable<any> {
    return this.apiService.get('statuses-courrier');
  }

  getAllUsages(): Observable<any> {
    return this.apiService.get('usages');
  }

  getAllRegions(): Observable<any> {
    return this.apiService.get('regions');
  }

  getProvincesByRegionId(regionId: number): Observable<any> {
    return this.apiService.get(`regions/${regionId}/provinces`);
  }

  getCommunesByProvinceId(provinceId: number): Observable<any> {
    return this.apiService.get(`provinces/${provinceId}/communes`);
  }

  getAllMiFinancements(): Observable<any> {
    return this.apiService.get('mi-financement');
  }

 


}
