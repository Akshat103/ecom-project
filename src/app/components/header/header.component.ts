import { Component, inject, OnInit, computed } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private loginDataService = inject(DataService);
  logInData = computed(() => this.loginDataService.getLogInData()());

  constructor(private router: Router) {}

  logOutHandler() {
    this.loginDataService.resetData();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (
        event instanceof NavigationEnd &&
        event.url &&
        localStorage.getItem('access_token') === 'true' &&
        event.url.includes('seller')
      ) {
        console.log('In seller');
      }
    });
  }
}