import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '@environments/environment.production';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseURL = `${environment.apiUrl}/products`; // https://shopnhaccu.vercel.app/api/product

  constructor(private http: HttpClient) {}

  // getAllProducts(params: { [key: string]: any } = {}): Observable<any> {
  //   // Build query string
  //   const queryString = Object.entries(params)
  //     .map(([key, value]) => {
  //       if (value === undefined || value === null || value === '') return '';
  //       return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  //     })
  //     .filter(Boolean)
  //     .join('&');
  //   return this.http.get(this.baseURL + (queryString ? `?${queryString}` : '')).pipe(
  //     catchError((error) => {
  //       throw error;
  //     })
  //   );
  // }

  getAllProducts(): Observable<any> {
    return this.http.get<Product>(this.baseURL).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  // getTotalProducts(): Observable<number> {
  //   return this.http.get<any>(this.baseURL).pipe(
  //     map((res: any) => {
  //       if (typeof res.totals === 'number') return res.totals;
  //       if (Array.isArray(res)) return res.length;
  //       if (res.results?.data) {
  //         return Array.isArray(res.results.data) ? res.results.data.length : res.results.data.products?.length || 0;
  //       }
  //       return 0;
  //     }),
  //     catchError(() => [0])
  //   );
  // }

  getTotalProductByRangePrice(min: number, max: number): Observable<number> {
    const query = `?priceDiscount[gte]=${min}&priceDiscount[lte]=${max}`;
    return this.http.get<any>(this.baseURL + query).pipe(
      map((res: any) => {
        if (typeof res.totals === 'number') return res.totals;
        if (Array.isArray(res)) return res.length;
        if (res.results?.data) {
          return Array.isArray(res.results.data) ? res.results.data.length : res.results.data.products?.length || 0;
        }
        return 0;
      }),
      catchError(() => [0])
    );
  }

  getProductBySlugName(productSlug: string): Observable<Product> {
    return this.http.get<Product>(this.baseURL + '/productItem?query=' + productSlug).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  searchProductsByName(searchValue: string): Observable<Product> {
    return this.http.get<Product>(this.baseURL + '/search?query=' + searchValue).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  // getAllProductsWithParams(params: { [key: string]: any }): Observable<any> {
  //   const queryString = Object.entries(params)
  //     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  //     .join('&');
  //   return this.http.get(this.baseURL + (queryString ? `?${queryString}` : '')).pipe(
  //     catchError((error) => {
  //       throw error;
  //     })
  //   );
  // }

  getProductsByFilterConditions(page: number, limit: number, minPrice?: number, maxPrice?: number, sort?: string): Observable<Product> {
    const query = `?page=${page}&limit=${limit}&priceDiscount[gte]=${minPrice}&priceDiscount[lte]=${maxPrice}&sort=${encodeURIComponent(sort as string)}`;
    return this.http.get<Product>(this.baseURL + query).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getProductsByPriceRange(min: number, max: number, sort?: string): Observable<Product> {
    const query = `?priceDiscount[gte]=${min}&priceDiscount[lte]=${max}&sort=${encodeURIComponent(sort as string)}`;

    return this.http.get<Product>(this.baseURL + query).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  /**
   * Lấy min và max của priceDiscount từ tất cả sản phẩm
   */
  getMinMaxPriceDiscount(): Observable<{ min: number; max: number }> {
    return this.http.get<any>(this.baseURL).pipe(
      map((res: any) => {
        let products: Product[] = [];
        if (Array.isArray(res)) {
          products = res;
        } else if (res.results?.data) {
          // Có thể là mảng hoặc object có products
          if (Array.isArray(res.results.data)) {
            products = res.results.data;
          } else if (Array.isArray(res.results.data.products)) {
            products = res.results.data.products;
          }
        }
        const discounts = products
          .map((p) => p.priceDiscount ?? 0)
          .filter((v) => typeof v === 'number');
        if (discounts.length === 0) return { min: 0, max: 0 };
        return {
          min: Math.min(...discounts),
          max: Math.max(...discounts),
        };
      }),
      catchError(() => [{ min: 0, max: 0 }])
    );
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
