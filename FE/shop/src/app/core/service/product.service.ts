import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private readonly baseURL = `${environment.apiUrl}/product`; // https://shopnhaccu.vercel.app/api/product

  constructor(private http: HttpClient) { }

//   getAllProducts(): Observable<any> {

//   }

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