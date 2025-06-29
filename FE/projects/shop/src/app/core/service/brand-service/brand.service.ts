import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment.production';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly baseURL = `${environment.apiUrl}/brands`;

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.http.get(this.baseURL).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getProductsByBrandId(brandId: string): Observable<any> {
    return this.http.get(this.baseURL + '/' + brandId).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
