
import { Component } from '@angular/core';
import { FlightSearchParameters } from './models/flights';
@Component({
   selector: 'app-flight-search',
   templateUrl: './flight-search.component.html',
   styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent {
   flightSearchParameters: FlightSearchParameters;

   constructor() { }

   setFlightSearch(flightSearchParam: FlightSearchParameters) {
      this.flightSearchParameters = flightSearchParam;
   }
}
