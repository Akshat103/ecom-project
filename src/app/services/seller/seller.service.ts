import { Injectable } from '@angular/core';
import { Seller } from '../../model/seller.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) {}

  sellerSignUp(seller: Seller): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/users`, seller);
  }

  sellerSignIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/auth/login`, credentials);
  }
}
