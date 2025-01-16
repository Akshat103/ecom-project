import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryDataService } from '../../../services/data/country-data.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.scss'
})
export class BusinessDetailsComponent implements OnInit, OnDestroy {
  @Input() businessDeatilsFormGroup!: FormGroup;
  
  private countryListSubscription: any;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(private countryService: CountryDataService) { }
  ngOnInit(): void {
    this.loadCountries();
    
    const initialCountry = this.businessDeatilsFormGroup.get('country')?.value;
    const initialState = this.businessDeatilsFormGroup.get('state')?.value;

    if (initialCountry) {
      this.loadStates(initialCountry);
      if (initialState) {
        this.loadCities(initialCountry, initialState);
      }
    }

    this.businessDeatilsFormGroup.get('country')?.valueChanges.pipe(debounceTime(300))
      .subscribe(selectedCountry => {
        if (selectedCountry) {
          this.loadStates(selectedCountry);
          this.businessDeatilsFormGroup.patchValue({
            state: '',
            city: ''
          }, { emitEvent: false });
          this.cities = [];
        }
      });

    this.businessDeatilsFormGroup.get('state')?.valueChanges.pipe(debounceTime(300))
      .subscribe(selectedState => {
        if (selectedState && this.businessDeatilsFormGroup.get('country')?.value) {
          this.loadCities(
            this.businessDeatilsFormGroup.get('country')?.value,
            selectedState
          );
          this.businessDeatilsFormGroup.patchValue({
            city: ''
          }, { emitEvent: false });
        }
      });

  }

  private loadCountries(): void {
    this.countryListSubscription = this.countryService.getCountryAndFlag().pipe(debounceTime(300))
      .subscribe({
        next: (data) => {
          this.countries = data;
        },
        error: (err) => {
          console.error("Error loading countries: ", err);
        }
      });
  }

  private loadStates(country: string): void {
    this.countryService.getStates(country)
      .subscribe({
        next: (data) => {
          this.states = data;
          
          const currentState = this.businessDeatilsFormGroup.get('state')?.value;
          if (currentState && !data.some((state: any) => state.name === currentState)) {
            this.businessDeatilsFormGroup.patchValue({ state: '' }, { emitEvent: false });
          }
        },
        error: (err) => {
          console.error("Error loading states: ", err);
        }
      });
  }

  private loadCities(country: string, state: string): void {
    this.countryService.getCities(country, state)
      .subscribe({
        next: (data) => {
          this.cities = data;
          
          const currentCity = this.businessDeatilsFormGroup.get('city')?.value;
          if (currentCity && !data.some((city: any) => city === currentCity)) {
            this.businessDeatilsFormGroup.patchValue({ city: '' }, { emitEvent: false });
          }
        },
        error: (err) => {
          console.error("Error loading cities: ", err);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.countryListSubscription) {
      this.countryListSubscription.unsubscribe();
    }
  }
}