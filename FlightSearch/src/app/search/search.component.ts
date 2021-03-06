
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Booking } from '../models/booking';
import { Flight, FlightSearchParameters } from '../models/flights';
import { FlightService } from '../services/flight.service';
import { Constants } from '../utils/constants';
const MAX_LIMIT = 10000;
@Component({
   selector: 'app-search',
   templateUrl: './search.component.html',
   styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
   @Output() flightSearchParameters = new EventEmitter<FlightSearchParameters>();
   returnJourney: Boolean = false;
   totalCities: String[] = [];
   departureCities: String[] = [];
   destinationCities: String[] = [];
   booking: Booking;
   invalidForm = false;
   amountLimitValue = MAX_LIMIT / 2;
   labels = Constants.labels;
   showdepartureCities: Boolean = false;
   showdestinationCities: Boolean = false;

   constructor(private flightService: FlightService) {
      this.booking = {
         destinationCity: '', departureCity: '', departureDate: '',
         returnDate: '', return: false, numberOfPassengers: null
      };
   }

   ngOnInit() {
      this.flightService.getCities().then(cities => {
         this.totalCities = [...cities];
         this.departureCities = [...cities];
         this.destinationCities = [...cities];
      });
   }

   toggleJourneyType() {
      this.returnJourney = !this.returnJourney;
      this.booking.return = this.returnJourney;
   }

   selectDepartureCity(city) {
      if (this.departureCities.includes(city)) {
         this.destinationCities = this.totalCities.filter(c => c !== city);
         this.booking.departureCity = city;
      } else {
         this.booking.departureCity = null;
      }
      this.showdepartureCities = false;
   }

   selectDestinationCity(city) {
      if (this.destinationCities.includes(city)) {
         this.booking.destinationCity = city;
         this.departureCities = this.totalCities.filter(c => c !== city);
      } else {
         this.booking.destinationCity = null;
      }
      this.showdestinationCities = false;
   }

   emptyDestinationCity() {
      this.showdestinationCities = true;
      this.booking.destinationCity = null;
      this.departureCities = this.totalCities.slice();
   }
   emptyDepartureCity() {
      this.showdepartureCities = true;
      this.booking.departureCity = null;
      this.destinationCities = this.totalCities.slice();
   }

   startDateSelected() {
      this.booking.returnDate = null;
   }

   onFormSubmit(formInputs): void {
      if (formInputs.form.valid) {
         this.invalidForm = false;
         this.searchFlights();
      } else {
         this.invalidForm = true;
      }

   }

   searchFlights(): void {
      this.performSearch(this.booking).then((data) => {
         this.flightSearchParameters.emit(data);
      });
   }

   private performSearch(booking: Booking) {
      return this.flightService.searchFlights(booking, this.amountLimitValue)
         .then((data: FlightSearchParameters) => {
            return data;
         });
   }

   changeRangeValue(value) {
      this.amountLimitValue = value ? value : MAX_LIMIT / 2;
      if (this.booking.departureCity && this.booking.destinationCity && this.booking.departureDate && this.booking.numberOfPassengers) {
         this.searchFlights();
      }
   }

}
