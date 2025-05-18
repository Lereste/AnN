import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '@environments/environment.production';
import { Products } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private readonly baseURL = `${environment.apiUrl}/products`; // https://shopnhaccu.vercel.app/api/product

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseURL).pipe(catchError((error) => {
      throw error;
    }))
  }

  getProductById(productId: string): Observable<Products> {
    return this.http.get<Products>(this.baseURL + '/' + productId).pipe(catchError((error) => {
      throw error;
    }))
  }

  //   searchIntraUserByKnoxID(searchPayload: SearchIntraUserPayloadModel): Observable<IntraUserModel[]> {
  //     const url = `${this.baseURL}/searchIntraUser`;
  //     return this.http.post<IntraUserModel[]>(url, searchPayload);
  //   }

  //   searchUsers(payload: SearchAllUserPayloadModel): Observable<UserModel[]> {
  //     const url = `${this.baseURL}/searchUser`;
  //     // payload.sort ={column: 'is_admin',type:'asc'}
  //     return this.http.post<UserModel[]>(url, payload);
  //   }

  //   setAdminRole(payload: SetAdminRolePayload) {
  //     const url = `${this.baseURL}/setAdminRoleMultiRows`;
  //     return this.http.post(url, payload);
  //   }

  //   inActiveMultiUsers(payload: InActivePayloadModel) {
  //     const url = `${this.baseURL}/inActiveMultiUsers`;
  //     return this.http.post(url, payload);
  //   }
}
