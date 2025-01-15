import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

interface ImageCache {
  [key: string]: Observable<string>;
}

@Pipe({
  name: 'validImage',
  pure: false
})
export class ValidImagePipe implements PipeTransform {
  private cache: ImageCache = {};
  private readonly validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  
  constructor(private http: HttpClient) {}

  transform(imageUrl: string, fallback: string = 'assets/no-picture.png'): Observable<string> {
    // Return from cache if available
    if (this.cache[imageUrl]) {
      return this.cache[imageUrl];
    }

    // Validate input
    if (!this.isValidInput(imageUrl)) {
      return of(fallback);
    }

    // Check file extension
    if (!this.hasValidExtension(imageUrl)) {
      console.warn(`Invalid image extension for URL: ${imageUrl}`);
      return of(fallback);
    }

    // Create and cache the validation observable
    const validation$ = this.validateImageUrl(imageUrl, fallback).pipe(
      shareReplay(1) // Cache the result
    );
    
    this.cache[imageUrl] = validation$;
    return validation$;
  }

  private isValidInput(url: string): boolean {
    return (url && typeof url === 'string' && url.trim().length > 0) as boolean;
  }

  private hasValidExtension(url: string): boolean {
    const lowercaseUrl = url.toLowerCase();
    return this.validExtensions.some(ext => lowercaseUrl.endsWith(ext));
  }

  private validateImageUrl(url: string, fallback: string): Observable<string> {
    return this.http.get(url, { 
      responseType: 'blob',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }).pipe(
      map(blob => {
        // Validate that the blob is actually an image
        if (!blob.type.startsWith('image/')) {
          console.warn(`Invalid image type for URL: ${url}, content-type: ${blob.type}`);
          return fallback;
        }
        return url;
      }),
      catchError(error => {
        console.error(`Error validating image URL: ${url}`, error);
        return of(fallback);
      })
    );
  }
}