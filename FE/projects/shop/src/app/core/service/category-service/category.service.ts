import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment.production';
import { Categories } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseURL = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {

  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseURL).pipe(catchError((error) => {
      throw error;
    }))
  }

  getProductsByCategoryId(categoryId: string): Observable<Categories> {
    return this.http.get<Categories>(this.baseURL + '/' + categoryId).pipe(catchError((error) => {
      throw error;
    }))
  }
}
