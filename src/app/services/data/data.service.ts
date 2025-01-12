import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private logInData = signal({
    loggedIn: localStorage.getItem('access_token') === 'true',
    seller: !!localStorage.getItem('refresh_token'),
  });

  isLoggedIn = computed(() => this.logInData().loggedIn);
  isSeller = computed(() => this.logInData().seller);

  setLogInData(data: { loggedIn: boolean; seller: boolean }) {
    localStorage.setItem('access_token', data.loggedIn ? 'true' : 'false');
    localStorage.setItem('refresh_token', data.seller ? 'true' : '');
    this.logInData.set(data);
  }

  resetData() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.logInData.set({ loggedIn: false, seller: false });
  }

  getLogInData() {
    return this.logInData;
  }
}
