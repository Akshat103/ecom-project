import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../model/category.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.serverUrl}/categories`);
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(`${environment.serverUrl}/categories`, category);
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${environment.serverUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.serverUrl}/categories/${id}`);
  }

  getCategoryProducts(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/categories/${categoryId}/products`);
  }
}
