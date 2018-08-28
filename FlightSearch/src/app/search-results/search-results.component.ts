
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
   departureDate: string;
   returnDate: string;
   numberOfPassengers: number;
   labels = Constants.labels;
   flightAvailability: Boolean;

   constructor() {}

   ngOnChanges() {
      console.log(this.flightSearchParameters);
      this.departureCity = this.flightSearchParameters ? this.flightSearchParameters.booking.departureCity : '';
      this.destinationCity = this.flightSearchParameters ? this.flightSearchParameters.booking.destinationCity : '';
      this.departureDate = this.flightSearchParameters ? this.flightSearchParameters.booking.departureDate : '';
      this.returnDate = this.flightSearchParameters ? this.flightSearchParameters.booking.returnDate : '';
      this.numberOfPassengers = this.flightSearchParameters ? this.flightSearchParameters.booking.numberOfPassengers : 0;
   }

   parseDate(date) {
      return Date.parse(date);
   }

   checkFlight(forwardFlight: Flight, returnFlight: Flight = null) {
      if (returnFlight) {
         return (this.parseDate(forwardFlight.time.destination) < this.parseDate(returnFlight.time.departure))
            && (((forwardFlight.cost + returnFlight.cost) * this.numberOfPassengers) <= this.flightSearchParameters.limit);
      } else {
         return (forwardFlight.cost * this.numberOfPassengers) <= this.flightSearchParameters.limit;
      }
   }
}

