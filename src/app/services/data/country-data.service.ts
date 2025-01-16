import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, throwError, map } from 'rxjs';
import { environment } from '../../../environment/environment';

interface StateCache {
  [country: string]: any[];
}

interface CityCache {
  [key: string]: any[];
}

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private countryList = new BehaviorSubject<any[]>([]);
  private statesList = new BehaviorSubject<any[]>([]);
  private citiesList = new BehaviorSubject<any[]>([]);
  
  private hasCountryListLoaded = false;
  private statesCache: StateCache = {};
  private citiesCache: CityCache = {};

  constructor(private http: HttpClient) { }

  getCountryAndFlag(): Observable<any[]> {
    if (this.hasCountryListLoaded) {
      return this.countryList.asObservable();
    }

    return this.http.get<any>(`${environment.countryDataAPI}/flag/unicode`).pipe(
      tap(response => {
        if (!response?.error) {
          const countryData = response.data;
          this.countryList.next(countryData);
          this.hasCountryListLoaded = true;
        } else {
          console.error('Invalid API response:', response);
          throwError(() => new Error("Invalid API response"));
        }
      }),
      catchError(error => {
        console.error('Error fetching country data:', error);
        return throwError(() => new Error("Failed to fetch country data."));
      }),
      map(response => response.data)
    );
  }

  getStates(country: string, forceReload: boolean = false): Observable<any[]> {
    if (this.statesCache[country] && !forceReload) {
      this.statesList.next(this.statesCache[country]);
      return this.statesList.asObservable();
    }

    const payload = { country };
    return this.http.post<any>(`${environment.countryDataAPI}/states`, payload).pipe(
      tap(response => {
        if (!response?.error) {
          const statesData = response.data.states;
          this.statesCache[country] = statesData;
          this.statesList.next(statesData);
        } else {
          console.error('Invalid API response:', response);
          throwError(() => new Error("Invalid API response"));
        }
      }),
      catchError(error => {
        console.error('Error fetching state data:', error);
        return throwError(() => new Error("Failed to fetch state data."));
      }),
      map(response => response.data.states)
    );
  }

  getCities(country: string, state: string): Observable<any[]> {
    const cacheKey = `${country}-${state}`;
    
    if (this.citiesCache[cacheKey]) {
      this.citiesList.next(this.citiesCache[cacheKey]);
      return this.citiesList.asObservable();
    }

    const payload = { country, state };
    return this.http.post<any>(`${environment.countryDataAPI}/state/cities`, payload).pipe(
      tap(response => {
        if (!response?.error) {
          const citiesData = response.data;
          this.citiesCache[cacheKey] = citiesData;
          this.citiesList.next(citiesData);
        } else {
          console.error('Invalid API response:', response);
          throwError(() => new Error("Invalid API response"));
        }
      }),
      catchError(error => {
        console.error('Error fetching cities data:', error);
        return throwError(() => new Error("Failed to fetch cities data."));
      }),
      map(response => response.data)
    );
  }

  // Optional: Method to clear cache if needed
  clearCache(): void {
    this.hasCountryListLoaded = false;
    this.statesCache = {};
    this.citiesCache = {};
    this.countryList.next([]);
    this.statesList.next([]);
    this.citiesList.next([]);
  }
}