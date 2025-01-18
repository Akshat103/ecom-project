import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private http: HttpClient) { }

  graphQuery(query: any): Observable<any> {
    return this.http.post<any>(`${environment.graphqlUrl}`, query);
  }
}
