import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button"
      (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
    *ngFor = "let housingLocation of filteredLocationList"
    [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = []
  filteredLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: Housinglocation[])=>{
      this.housingLocationList =housingLocationList
      this.filteredLocationList = this.housingLocationList
    });
  }
  filterResults(value: string) {
    if (!value) {
      this.filteredLocationList = this.housingLocationList
    }
    this.filteredLocationList = this.housingLocationList.filter(housinglocation => housinglocation?.city.toLowerCase().includes(value.toLowerCase()))
  }
}
