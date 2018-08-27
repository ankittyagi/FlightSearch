
import { Flight } from './../models/flights';
import { Component, Input, OnChanges } from '@angular/core';
import { FlightSearchParameters } from '../models/flights';
import { Constants } from './../utils/constants';
@Component({
   selector: 'app-search-results',
   templateUrl: './search-results.component.html',
   styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnChanges {
   @Input() flightSearchParameters: FlightSearchParameters;
   departureCity: string;
   destinationCity: string;
   numberOfPassengers: number;
   labels = Constants.labels;
   flightAvailability: Boolean;

   constructor() { }

   ngOnChanges() {
      this.departureCity = this.flightSearchParameters ? this.flightSearchParameters.booking.departureCity : '';
      this.destinationCity = this.flightSearchParameters ? this.flightSearchParameters.booking.destinationCity : '';
      this.numberOfPassengers = this.flightSearchParameters ? this.flightSearchParameters.booking.numberOfPassengers : 0;
   }

   parseDate(date) {
      return Date.parse(date);
   }

   checkFlight(onwardFlight: Flight, returnFlight: Flight = null) {
      if (returnFlight) {
         return (this.parseDate(onwardFlight.time.destination) < this.parseDate(returnFlight.time.departure))
            && (((onwardFlight.cost + returnFlight.cost) * this.numberOfPassengers) <= this.flightSearchParameters.limit);
      } else {
         return (onwardFlight.cost * this.numberOfPassengers) <= this.flightSearchParameters.limit;
      }
   }
}

