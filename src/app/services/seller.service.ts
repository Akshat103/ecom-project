import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../model/seller.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient) { }

  sellerSignUp(data:Seller){
    return this.http.post(`${environment.serverUrl}/seller`,data);
  }
}
