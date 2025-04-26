import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LinkProdDiscRequest, ProductDiscountLink} from "./linkProduct.data";


@Injectable({
  providedIn: 'root'
})

export class LinkProductService {
  private apiUrl = 'http://localhost:8080';  // Directly using your API endpoint

  constructor(private http: HttpClient) { }

  // Get all coupons
  getLinkedProducts(): Observable<ProductDiscountLink[]> {
    return this.http.get<ProductDiscountLink[]>(`${this.apiUrl}/aapiee/getlinks`);
  }
  prolongerLien(id: number, request: LinkProdDiscRequest): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/aapiee/prolonger/${id}`, request);
  }
}
