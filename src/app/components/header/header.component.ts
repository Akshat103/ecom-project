import { Component, inject, OnInit, computed } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  loginDataService = inject(DataService);
  isLoggedIn = computed(() => this.loginDataService.isLoggedIn());
  isSeller = computed(() => this.loginDataService.isSeller());
  constructor(private route: Router) { }

  logOutHandler() {
    this.loginDataService.resetData();
    this.route.navigate(['/']);
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: Event) => {
      if (val instanceof NavigationEnd &&
        val.url &&
        (localStorage.getItem('loginToken') === 'true') &&
        val.url.includes('seller')
      ) {
        console.log("In seller");
      }
    })
  }
}
